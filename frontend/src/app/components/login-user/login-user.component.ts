import { Component } from '@angular/core';
import { Usuario, UsuariosService } from '../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {

  nombre: string = '';
  contrasenia: string = '';
  
  constructor(private http:HttpClient, private usuariosService:UsuariosService) {}

  getUsuario(){
    this.usuariosService.getUsuarioLogin(this.nombre, this.contrasenia).subscribe(
      res => {
        if(res.succes){
          Swal.fire({
            title: 'Login exitoso',
            text: 'Has iniciado sesion',
            icon: 'success'
          })
        }
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: 'Nombre de usuario o contrasenia incorrecto',
          icon: 'error'
        })
      }
    )
  }
}
