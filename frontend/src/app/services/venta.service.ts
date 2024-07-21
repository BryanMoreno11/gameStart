import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  API_URL='http://localhost:3000/api/';
  //#region Métodos
  constructor(private http:HttpClient) {
  }
  
  insertVenta(venta:Venta){
    return this.http.post(`${this.API_URL}venta`,venta);
  }

  insertVentaDetalle(venta_detalle:VentaDetalle){
    return this.http.post(`${this.API_URL}ventadetalle`,venta_detalle);
  }


}

export interface Venta{
  id_cliente:number | string;
  total_venta:number;
  subtotal:number;
  iva:number;
}

export interface VentaDetalle{
  id_venta:number | string;
  id_videojuego_plataforma:number | string;
  cantidad_vendida:number;
  importe:number;
}
