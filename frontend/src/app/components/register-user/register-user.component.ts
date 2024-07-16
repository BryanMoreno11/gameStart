import { Component } from '@angular/core';
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

  constructor(private http:HttpClient, private usuariosService:UsuariosService) {}

  insertarUsuario(){
    this.usuariosService.insertarUsuario(this.usuario).subscribe(res=>{
      window.alert("Se guardó el usuario");
    });
  }
}
