import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { VideojuegoDetalleComponent } from './components/videojuego-detalle/videojuego-detalle.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerificacionTokenComponent } from './components/verificacion-token/verificacion-token.component';
import { AuthenticateQrComponent } from './components/authenticate-qr/authenticate-qr.component';
import { VideojuegosComponent } from './components/videojuegos/videojuegos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

export const routes: Routes = [
    {path:'inicio', component:InicioComponent},
    {path:'videojuego/:id', component:VideojuegoDetalleComponent},
    {path: 'login', component: LoginUserComponent},
    {path: 'register', component: RegisterUserComponent},
    {path: 'token-verify', component: VerificacionTokenComponent},
    {path: 'qr-verify',component: AuthenticateQrComponent},
    {path:"**", pathMatch:"full", redirectTo:"inicio"}
];
