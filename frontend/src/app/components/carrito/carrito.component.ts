import { Component } from '@angular/core';
import { CarritoService, Carrito, Producto } from '../../services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule],
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


}
