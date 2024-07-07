import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
//atributos
API_URL='http://localhost:3000/api/';
//#region Métodos
constructor(private http:HttpClient) {
}

getVideojuegos(){
  return this.http.get(`${this.API_URL}videojuegos`);
}

getVideojuegosRecientes(){
  return this.http.get(`${this.API_URL}videojuegos/recientes`);
}

getVideojuego(id:number){
  return this.http.get(`${this.API_URL}videojuego/${id}`);
}



}
