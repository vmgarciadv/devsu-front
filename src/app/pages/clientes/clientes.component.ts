import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  template: `
    <div class="page-container">
      <div class="content-header">
        <h2>Clientes</h2>
      </div>

      <app-search-bar 
        placeholder="Buscar por nombre, ID, email..."
        (searchChange)="onSearch($event)"
        (newClick)="onNewCliente()">
      </app-search-bar>

      <div class="table-container">
        <div class="table-placeholder" *ngIf="filteredClientes.length === 0">
          <p>No hay clientes registrados</p>
          <p class="subtitle">Haz clic en "Nuevo" para agregar un cliente</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  filteredClientes: any[] = [];

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.filteredClientes = [...this.clientes];
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewCliente(): void {
    console.log('Crear nuevo cliente');
  }
}