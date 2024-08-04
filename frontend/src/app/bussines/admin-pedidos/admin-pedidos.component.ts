import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PedidoService } from '../../services/pedidos.service';
import { Pedido } from '../../models/pedido';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
})
export default class AdminPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  proveedores: any[] = [];
  videojuegosPlataformas: any[] = [];
  sucursales: any[] = [];
  selectedPedido: Pedido = this.initializePedido();
  isFormVisible: boolean = false;
  isEditing: boolean = false;

  constructor(private pedidoService: PedidoService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPedidos();
    this.getProveedores();
    this.getVideojuegosPlataformas();
    this.getSucursales();
  }

  getPedidos(): void {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  getProveedores(): void {
    this.pedidoService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
      this.cdr.detectChanges();
    });
  }

  getVideojuegosPlataformas(): void {
    this.pedidoService.getVideojuegosPlataformas().subscribe(videojuegosPlataformas => {
      this.videojuegosPlataformas = videojuegosPlataformas;
      this.cdr.detectChanges();
    });
  }

  getSucursales(): void {
    this.pedidoService.getSucursales().subscribe(sucursales => {
      this.sucursales = sucursales;
      this.cdr.detectChanges();
    });
  }

  savePedido(): void {
    if (this.isEditing && this.selectedPedido.id_pedido) {
      this.pedidoService.updatePedido(this.selectedPedido.id_pedido, this.selectedPedido).subscribe(() => {
        this.getPedidos();
        this.isFormVisible = false;
        this.selectedPedido = this.initializePedido();
      });
    } else {
      this.pedidoService.addPedido(this.selectedPedido).subscribe(() => {
        this.getPedidos();
        this.isFormVisible = false;
        this.selectedPedido = this.initializePedido();
      });
    }
  }

  editPedido(pedido: Pedido): void {
    this.selectedPedido = { ...pedido };
    this.isFormVisible = true;
    this.isEditing = true;
  }

  showInsertForm(): void {
    this.selectedPedido = this.initializePedido();
    this.isFormVisible = true;
    this.isEditing = false;
  }

  deletePedido(id: number): void {
    this.pedidoService.deletePedido(id).subscribe(() => this.getPedidos());
  }

  initializePedido(): Pedido {
    return {
      id_pedido: null,
      id_proveedor: null,
      id_videojuego_plataforma: null,
      id_sucursal: null,
      precio_unitario: 0,
      cantidad: 0,
      descuento: 0,
      total: 0,
      estado: ''
    };
  }

  closeModal(): void {
    this.isFormVisible = false;
    this.selectedPedido = this.initializePedido();
  }
}
