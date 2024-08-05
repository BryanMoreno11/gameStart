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
  
    const formattedVideojuego = {
      ...this.selectedVideojuego,
      // Remove fecha_creacion from here as it's generated automatically in the database
    };
  
    console.log('Videojuego to be saved:', formattedVideojuego);
  
    if (this.isEditing && formattedVideojuego.id_videojuego) {
      this.videojuegosService.updateVideojuego(formattedVideojuego.id_videojuego, formattedVideojuego).subscribe(
        (response) => {
          console.log('Update response:', response);
          this.getVistaVideojuegos();
          this.isFormVisible = false;
          this.selectedVideojuego = this.initializeVideojuego();
        },
        (error) => {
          console.error('Error updating videojuego:', error);
        }
      );
    } else {
      this.videojuegosService.addVideojuego(formattedVideojuego).subscribe(
        (response) => {
          console.log('Add response:', response);
          this.getVistaVideojuegos();
          this.isFormVisible = false;
          this.selectedVideojuego = this.initializeVideojuego();
        },
        (error) => {
          console.error('Error adding videojuego:', error);
        }
      );
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

  formatDate(date: Date | string | null | undefined): string {
    if (!date) {
      return '';
    }
    const d = new Date(date);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = d.getDate().toString().padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString().slice(-2);
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

    return `${day}-${month}-${year} ${formattedHours}.${minutes}.${seconds}.000000000 ${ampm}`;
  }

  getDiscountDisplay(discount: number | null): string {
    return discount !== null ? `${(discount * 100).toFixed(2)}%` : 'Ninguno';
  }
}
