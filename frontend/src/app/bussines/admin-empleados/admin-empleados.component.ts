import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-empleados',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-empleados.component.html',
  styleUrl: './admin-empleados.component.css'
})
export default class AdminEmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  sucursales: any[] = [];
  ciudades: any[] = [];
  puestos: any[] = [];
  selectedEmpleado: Empleado = this.initializeEmpleado();

  constructor(private empleadoService: EmpleadoService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getEmpleados();
    this.getSucursales();
    this.getCiudades();
    this.getPuestos();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  getSucursales(): void {
    this.empleadoService.getSucursales().subscribe(sucursales => {
      console.log('Sucursales:', sucursales); // Verifica que los objetos tengan `id` y `nombre`
      this.sucursales = sucursales;
      this.cdr.detectChanges();
    });
  }
  
  getCiudades(): void {
    this.empleadoService.getCiudades().subscribe(ciudades => {
      console.log('Ciudades:', ciudades); // Verifica que los objetos tengan `id` y `nombre`
      this.ciudades = ciudades;
      this.cdr.detectChanges();
    });
  }
  
  getPuestos(): void {
    this.empleadoService.getPuestos().subscribe(puestos => {
      console.log('Puestos:', puestos); // Verifica que los objetos tengan `id` y `nombre`
      this.puestos = puestos;
      this.cdr.detectChanges();
    });
  }

  saveEmpleado(): void {
    if (this.selectedEmpleado.id_empleado) {
      this.empleadoService.updateEmpleado(this.selectedEmpleado.id_empleado, this.selectedEmpleado).subscribe(() => this.getEmpleados());
    } else {
      this.empleadoService.addEmpleado(this.selectedEmpleado).subscribe(() => this.getEmpleados());
    }
    this.selectedEmpleado = this.initializeEmpleado();
  }

  editEmpleado(empleado: Empleado): void {
    this.selectedEmpleado = { ...empleado };
    this.selectedEmpleado.fecha_nacimiento = this.formatearFecha(this.selectedEmpleado.fecha_nacimiento);
    
  }

  formatearFecha(fecha:any):string{
    let yyyy = fecha.getFullYear();
    let mm = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    let dd = String(fecha.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`
  
  }

  deleteEmpleado(id: number): void {
    this.empleadoService.deleteEmpleado(id).subscribe(() => this.getEmpleados());
  }

  initializeEmpleado(): Empleado {
    return {
      id_empleado: null,
      id_sucursal: null,
      id_ciudad: null,
      id_puesto: null,
      cedula: '',
      nombre: '',
      fecha_nacimiento: null,
      direccion: '',
      telefono: '',
      correo: '',
      estado: ''
    };
  }
}