import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { VideojuegoDetalleComponent } from './components/videojuego-detalle/videojuego-detalle.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/componets/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./bussines/dashboard/dashboard.component')
            },
            {
                path: 'empleados',
                loadComponent: () => import('./bussines/admin-empleados/admin-empleados.component')
            },
            {
                path: 'pedidos',
                loadComponent: () => import('./bussines/admin-pedidos/admin-pedidos.component')
            },
            {
                path: 'video_juegos',
                loadComponent: () => import('./bussines/admin-videojuegos/admin-videojuegos.component')
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },
    
        {path:'inicio', component:InicioComponent},
        {path:'videojuego/:id', component:VideojuegoDetalleComponent},
        {path:"**", pathMatch:"full", redirectTo:"inicio"}
    
];