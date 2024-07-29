import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { VideojuegoDetalleComponent } from './components/videojuego-detalle/videojuego-detalle.component';
import { VideojuegosComponent } from './components/videojuegos/videojuegos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ReportesComponent } from './components/reportes/reportes.component';

export const routes: Routes = [
    {path:'inicio', component:InicioComponent},
    {path:'videojuego/:id', component:VideojuegoDetalleComponent},
    {path:'videojuegos', component:VideojuegosComponent},
    {path:'carrito', component:CarritoComponent},
    {path:'reportes', component:ReportesComponent},
    {path:"**", pathMatch:"full", redirectTo:"inicio"}
];
