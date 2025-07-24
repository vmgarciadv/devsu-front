import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-cuentas',
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.scss'
})
export class CuentasComponent {
  cuentas: any[] = [];
  filteredCuentas: any[] = [];

  ngOnInit(): void {
    this.loadCuentas();
  }

  loadCuentas(): void {
    this.filteredCuentas = [...this.cuentas];
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewCuenta(): void {
    console.log('Crear nueva cuenta');
  }
}
