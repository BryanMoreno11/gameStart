import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuariosService } from '../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  usuario: Usuario  = {
    nombre: '',
    contrasenia: '',
    apellido: '',
    correo: '',
    telefono: '',
    rol: '',
    estado: ''
  };

  constructor(private http:HttpClient, private usuariosService:UsuariosService, private router:Router) {}

  insertarUsuario() {
    this.usuariosService.insertarUsuario(this.usuario).subscribe(res => {
      console.log(res);
      if (res.secret) {
        window.alert("Se guardó el usuario");
        // Redirigir al componente del QR con el secret
        this.router.navigate(['/qr-verify'], { queryParams: { nombre: res.nombre } });
      } else {
        window.alert("Error al guardar el usuario");
      }
    });
  }
}
