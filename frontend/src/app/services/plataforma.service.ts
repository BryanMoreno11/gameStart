import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
//atributos
API_URL='http://localhost:3000/api/';
//#region Métodos
constructor(private http:HttpClient) {
}

getPlataformasVideojuego(){
  return this.http.get(`${this.API_URL}plataformas/videojuegos`);
}

}