import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import LayoutComponent from './shared/components/layout/layout.component';
import DashboardComponent from './bussines/dashboard/dashboard.component';
import SidebarComponent from './shared/components/sidebar/sidebar.component';
import AdminEmpleadosComponent from './bussines/admin-empleados/admin-empleados.component';
import AdminPedidosComponent from './bussines/admin-pedidos/admin-pedidos.component';
import AdminVideojuegosComponent from './bussines/admin-videojuegos/admin-videojuegos.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,LayoutComponent,DashboardComponent,SidebarComponent,AdminEmpleadosComponent,AdminPedidosComponent,AdminVideojuegosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Game Start';
}
