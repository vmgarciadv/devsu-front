import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { ModalClienteComponent } from '../../components/shared/modal-cliente/modal-cliente.component';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ModalClienteComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  isModalOpen: boolean = false;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.filteredClientes = [...this.clientes];
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewCliente(): void {
    this.isModalOpen = true;
  }

  onCloseModal(): void {
    this.isModalOpen = false;
  }

  onSaveCliente(cliente: Cliente): void {
    this.clientesService.createCliente(cliente).subscribe({
      next: (newCliente) => {
        this.clientes.push(newCliente);
        this.filteredClientes = [...this.clientes];
        this.isModalOpen = false;
        console.log('Cliente creado exitosamente');
      },
      error: (error) => {
        console.error('Error al crear cliente:', error);
      }
    });
  }
}