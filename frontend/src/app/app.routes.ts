import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { VideojuegoDetalleComponent } from './components/videojuego-detalle/videojuego-detalle.component';

export const routes: Routes = [
    {path:'inicio', component:InicioComponent},
    {path:'videojuego/:id', component:VideojuegoDetalleComponent},
    {path:"**", pathMatch:"full", redirectTo:"inicio"}
];
