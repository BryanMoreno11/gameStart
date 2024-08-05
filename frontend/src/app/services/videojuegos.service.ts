import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getVideojuegosnormal(): Observable<Videojuego[]> {
    return this.http.get<ApiVideojuego[]>(`${this.apiUrl}/videojuegos/normal`).pipe(
      map((apiVideojuegos: ApiVideojuego[]) => apiVideojuegos.map((apiVideojuego: ApiVideojuego) => this.transformVideojuego(apiVideojuego)))
    );
  }

  getVideojuegonormal(id:number){
    return this.http.get(`${this.apiUrl}videojuego/normal/${id}`);
  }

  getVideojuegos(){
    return this.http.get(`${this.apiUrl}videojuegos`);
  }

  getVideojuegosRecientes(){
    return this.http.get(`${this.apiUrl}videojuegos/recientes`);
  }
  
  getVideojuego(id:number){
    return this.http.get(`${this.apiUrl}videojuego/${id}`);
  }

  getVideojuegosvista(): Observable<VistaVideojuego[]> {
    return this.http.get<ApiVistaVideojuego[]>(`${this.apiUrl}/videojuegos`).pipe(
      map((apiVideojuegosvista: ApiVistaVideojuego[]) => apiVideojuegosvista.map((apiVideojuegosvista: ApiVistaVideojuego) => this.transformVistaVideojuego(apiVideojuegosvista)))
    );
  }

  addVideojuego(videojuego: Videojuego): Observable<any> {
    return this.http.post(`${this.apiUrl}/videojuego`, videojuego);
  }

  updateVideojuego(id: number, videojuego: Videojuego): Observable<any> {
    return this.http.put(`${this.apiUrl}/videojuego/${id}`, videojuego);
  }

  deleteVideojuego(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/videojuego/${id}`);
  }

  private transformVideojuego(apiVideojuego: ApiVideojuego): Videojuego {
    return {
      id_videojuego: apiVideojuego.ID_VIDEOJUEGO,
      id_desarrolladora: apiVideojuego.ID_DESARROLLADORA,
      titulo: apiVideojuego.TITULO,
      descripcion: apiVideojuego.DESCRIPCION,
      fecha_creacion: new Date(apiVideojuego.FECHA_CREACION),
      estado: apiVideojuego.ESTADO
    };
  }

  private transformVistaVideojuego(apiVistaVideojuego: ApiVistaVideojuego): VistaVideojuego {
    return {
      id_videojuego_plataforma: apiVistaVideojuego.ID_VIDEOJUEGO_PLATAFORMA,
      id_videojuego: apiVistaVideojuego.ID_VIDEOJUEGO,
      titulo: apiVistaVideojuego.TITULO,
      imagen: apiVistaVideojuego.IMAGEN,
      descripcion_videojuego: apiVistaVideojuego.DESCRIPCION_VIDEOJUEGO,
      precio: apiVistaVideojuego.PRECIO,
      descuento: apiVistaVideojuego.DESCUENTO !== null ? apiVistaVideojuego.DESCUENTO : 0,
      fecha_creacion_videojuego: new Date(apiVistaVideojuego.FECHA_CREACION_VIDEOJUEGO),
      estado_videojuego: apiVistaVideojuego.ESTADO_VIDEOJUEGO,
      id_desarrolladora: apiVistaVideojuego.ID_DESARROLLADORA,
      nombre_desarrolladora: apiVistaVideojuego.NOMBRE_DESARROLLADORA,
      id_plataforma: apiVistaVideojuego.ID_PLATAFORMA,
      nombre_plataforma: apiVistaVideojuego.NOMBRE_PLATAFORMA,
      generos: apiVistaVideojuego.GENEROS,
      stock: apiVistaVideojuego.STOCK
    };
  }
}


// ApiVideojuego.ts
export interface ApiVideojuego {
  ID_VIDEOJUEGO: number;
  ID_DESARROLLADORA: number;
  TITULO: string;
  DESCRIPCION: string;
  FECHA_CREACION: string;
  ESTADO: string;
}

// Videojuego.ts
export interface Videojuego {
  id_videojuego?: number | null;
  id_desarrolladora: number | null;
  titulo: string | null;
  descripcion: string | null;
  fecha_creacion?: Date | null | string;
  estado: string | null;
}

// ApiVistaVideojuego.ts
export interface ApiVistaVideojuego {
  ID_VIDEOJUEGO_PLATAFORMA: number;
  ID_VIDEOJUEGO: number;
  TITULO: string;
  IMAGEN: string;
  DESCRIPCION_VIDEOJUEGO: string;
  PRECIO: number;
  DESCUENTO: number;
  FECHA_CREACION_VIDEOJUEGO: string;
  ESTADO_VIDEOJUEGO: string;
  ID_DESARROLLADORA: number;
  NOMBRE_DESARROLLADORA: string;
  ID_PLATAFORMA: number;
  NOMBRE_PLATAFORMA: string;
  GENEROS: string;
  STOCK: number;
}

// VistaVideojuego.ts
export interface VistaVideojuego {
  id_videojuego_plataforma?: number | null;
  id_videojuego?: number | null;
  titulo: string | null;
  imagen: string;
  descripcion_videojuego: string | null;
  precio: number | null;
  descuento: number | null;
  fecha_creacion_videojuego?: Date | null;
  estado_videojuego: string | null;
  id_desarrolladora: number | null;
  nombre_desarrolladora: string | null;
  id_plataforma: number | null;
  nombre_plataforma: string | null;
  generos: string | null;
  stock: number | null;
}

