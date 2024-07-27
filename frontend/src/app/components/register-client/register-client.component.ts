import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente, ClientesService } from '../../services/clientes.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})
export class RegisterClientComponent {
  

   cliente: Cliente = {
    id_ciudad: '',
    cedula: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    correo: '',
    contrasenia: '',
  }

  constructor(private http:HttpClient, private clientesServices:ClientesService, private router:Router) {}

  insertarCliente() {
    this.clientesServices.insertarCliente(this.cliente).subscribe(res => {
      console.log(res);
      if (res.message) {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El usuario ha sido registrado correctamente',
          icon: 'success'
        })
        this.router.navigate(['/'],);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'El usuario no se ha sido registrado correctamente',
          icon: 'error'
        })
      }
    });
  }
}
