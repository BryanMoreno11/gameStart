import { Component } from '@angular/core';
import { CarritoService, Carrito, Producto } from '../../services/carrito.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  //#region atributos
  productos:Producto[]=[];
  carrito:Carrito;
  //#region Métodos
  constructor(private carrito_service:CarritoService) {
    this.productos=carrito_service.productos;
    this.carrito=carrito_service.carrito;
    console.log(this.carrito.total_venta);
  }

  actualizarCantidad(producto:any, cantidad:number){
    if(cantidad>producto.videojuego.STOCK){
      this.carrito_service.mensajeAlertaStock(producto);
      this.carrito_service.setCantidad(producto, 1);
    }
    else if(cantidad<=0){
      this.carrito_service.mensajeAlertaStockNegativo();
      this.carrito_service.setCantidad(producto, 1);

    }
    else{
      this.carrito_service.setCantidad(producto, cantidad);
    }
  }

  aumentar(producto:any){
    producto.cantidad++;
    this.actualizarCantidad(producto, producto.cantidad);
  }

  decrementar(producto:any){
    if(producto.cantidad>1){
      producto.cantidad--;
    this.actualizarCantidad(producto, producto.cantidad);
    }
  }

  eliminarProducto(producto:any){
    Swal.fire({
      title: "¿Estás seguro de eliminar este producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.carrito_service.eliminarProducto(producto);
        this.productos=this.carrito_service.productos;
        Swal.fire({
          title: "¡Producto Eliminado!",
          icon: "success"
        });
      }
    });
  }

  realizarCompra(){
      Swal.fire({
        title: "¿Estás seguro de proceder con la compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.carrito_service.efectuarCompra();
          this.productos=this.carrito_service.productos;
          this.carrito=this.carrito_service.carrito;
          Swal.fire({
            title: "¡Compra efectuada con éxito!",
            icon: "success"
          });
        }
      });
   }




}
