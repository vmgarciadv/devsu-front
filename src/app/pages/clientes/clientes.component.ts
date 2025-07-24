import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './clientes.component.html',
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