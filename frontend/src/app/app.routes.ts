import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { VideojuegoDetalleComponent } from './components/videojuego-detalle/videojuego-detalle.component';
import { VideojuegosComponent } from './components/videojuegos/videojuegos.component';

export const routes: Routes = [
    {path:'inicio', component:InicioComponent},
    {path:'videojuego/:id', component:VideojuegoDetalleComponent},
    {path:'videojuegos', component:VideojuegosComponent},
    {path:"**", pathMatch:"full", redirectTo:"inicio"}
];
