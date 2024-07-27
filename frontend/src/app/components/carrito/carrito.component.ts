import { Component } from '@angular/core';
import { CarritoService, Carrito, Producto } from '../../services/carrito.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { Venta, VentaDetalle, VentaService } from '../../services/venta.service';
import { HttpClient } from '@angular/common/http';

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
  //Atributos para insertar en la BD
  id_cliente:number;
 
  venta:Venta={
    id_cliente:0,
    total_venta:0,
    subtotal:0,
    iva:0
  }
  venta_detalle:VentaDetalle={
    id_venta:0,
    id_videojuego_plataforma:0,
    cantidad_vendida:0,
    importe:0
  }
  //Atributos para la factura
  vistaVenta:any;
  vistaVentaDetalle:any;
  //#region Métodos
  constructor(private carrito_service:CarritoService, private venta_service:VentaService,private httpclien:HttpClient) {
    this.productos=carrito_service.productos;
    this.carrito=carrito_service.carrito;
    console.log(this.carrito.total_venta);
    this.id_cliente=23;
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
        //Setear datos para venta
        this.carrito_service.efectuarCompra();
        this.venta.id_cliente=this.id_cliente;
        this.venta.subtotal=this.carrito.subtotal_venta;
        this.venta.iva=this.carrito.iva;
        this.venta.total_venta=this.carrito.total_venta;
        //Llamada a la api
        this.venta_service.insertVenta(this.venta).subscribe((res:any)=>{
        this.realizarVenta(res.id).then(
          res=>{
            //------------Obtención del objeto venta y arreglo de detalle venta
            this.venta_service.getVenta(this.venta_detalle.id_venta).subscribe((res:any)=>{
              this.vistaVenta=res[0];
              console.log("La vista de la venta es ", this.vistaVenta);
              this.venta_service.getVentaDetalle(this.venta_detalle.id_venta).subscribe((res:any)=>{
                this.vistaVentaDetalle= res;
                console.log("La vista de la venta detalle es ", this.vistaVentaDetalle);
                //---Mensaje final
              this.productos=this.carrito_service.productos;
              this.carrito=this.carrito_service.carrito;
              this.enviarCorreoCliente();
              Swal.fire({
                title: "¡Compra efectuada con éxito!",
                text:"En su correo podrá ver la factura",
                icon: "success"
              });
              });
            });


          }
        );
        });



       
      }
    });
 }

 async realizarVenta(id_venta:number) {
  try {
      // Setear datos para Venta Detalle
      this.venta_detalle.id_venta = id_venta;
      // Crear una lista de promesas para las inserciones
      let promesas = [];

      for (let producto of this.productos) {
          this.venta_detalle.id_videojuego_plataforma = producto.videojuego.ID_VIDEOJUEGO_PLATAFORMA;
          this.venta_detalle.cantidad_vendida = producto.cantidad;
          this.venta_detalle.importe = producto.precio_total;
          // Añadir la promesa de inserción a la lista
          promesas.push(this.venta_service.insertVentaDetalle(this.venta_detalle).toPromise());
      }
      // Esperar a que todas las promesas se completen
      await Promise.all(promesas);
  } catch (error) {
      console.error('Error al insertar venta detalle:', error);
  }
}

enviarCorreoCliente(){
  console.log("Enviando correo...");
  let params = {
    cedula: this.vistaVenta.CEDULA,
    nombre: this.vistaVenta.NOMBRE_CLIENTE,
    correo: this.vistaVenta.CORREO,
    fecha_venta: this.vistaVenta.FECHA_VENTA,
    cod_venta: this.vistaVenta.CODIGO_VENTA,
    subtotal: this.vistaVenta.SUBTOTAL,
    iva: this.vistaVenta.IVA,
    total_venta: this.vistaVenta.TOTAL_VENTA,
    productos: this.vistaVentaDetalle,
    id_venta: this.vistaVenta.ID_VENTA,
    ciudad: this.vistaVenta.CIUDAD,
  }
  this.httpclien.post('http://localhost:3000/api/correo/',params).subscribe(resp=>{
  console.log(resp);
  });
}


}
