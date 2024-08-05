import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VideojuegosService, Videojuego, VistaVideojuego } from '../../services/videojuegos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-videojuegos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-videojuegos.component.html',
  styleUrls: ['./admin-videojuegos.component.css']
})
export default class AdminVideojuegosComponent implements OnInit {
  vistaVideojuegos: VistaVideojuego[] = [];
  selectedVideojuego: Videojuego = this.initializeVideojuego();
  isFormVisible: boolean = false;
  isEditing: boolean = false;
  validationMessages: { [key: string]: string } = {};

  constructor(private videojuegosService: VideojuegosService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getVistaVideojuegos();
  }

  getVistaVideojuegos(): void {
    this.videojuegosService.getVideojuegosvista().subscribe(vistaVideojuegos => {
      this.vistaVideojuegos = vistaVideojuegos;
      this.cdr.detectChanges();
    });
  }

  validateVideojuego(): boolean {
    this.validationMessages = {};
    // Add validation logic here
    return Object.keys(this.validationMessages).length === 0;
  }

  saveVideojuego(): void {
    if (!this.validateVideojuego()) {
      return;
    }

    if (this.isEditing && this.selectedVideojuego.id_videojuego) {
      this.videojuegosService.updateVideojuego(this.selectedVideojuego.id_videojuego, this.selectedVideojuego).subscribe(() => {
        this.getVistaVideojuegos();
        this.isFormVisible = false;
        this.selectedVideojuego = this.initializeVideojuego();
      });
    } else {
      this.videojuegosService.addVideojuego(this.selectedVideojuego).subscribe(() => {
        this.getVistaVideojuegos();
        this.isFormVisible = false;
        this.selectedVideojuego = this.initializeVideojuego();
      });
    }
  }

  editVideojuego(videojuego: VistaVideojuego): void {
    this.selectedVideojuego = {
      id_videojuego: videojuego.id_videojuego,
      id_desarrolladora: videojuego.id_desarrolladora,
      titulo: videojuego.titulo,
      descripcion: videojuego.descripcion_videojuego,
      fecha_creacion: videojuego.fecha_creacion_videojuego,
      estado: videojuego.estado_videojuego
    };
    this.isFormVisible = true;
    this.isEditing = true;
  }

  showInsertForm(): void {
    this.selectedVideojuego = this.initializeVideojuego();
    this.isFormVisible = true;
    this.isEditing = false;
  }

  deleteVideojuego(id: number): void {
    this.videojuegosService.deleteVideojuego(id).subscribe(() => {
      this.getVistaVideojuegos();
    });
  }

  initializeVideojuego(): Videojuego {
    return {
      id_videojuego: null,
      id_desarrolladora: null,
      titulo: null,
      descripcion: null,
      fecha_creacion: new Date(),
      estado: null
    };
  }
  
  
  
  closeModal(): void {
    this.isFormVisible = false;
    this.selectedVideojuego = this.initializeVideojuego();
  }
}
