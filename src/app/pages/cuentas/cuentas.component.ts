import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { CuentasService } from '../../services/cuentas.service';
import { Cuenta } from '../../models/cuenta.model';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.scss'
})
export class CuentasComponent implements OnInit {
  cuentas: Cuenta[] = [];
  filteredCuentas: Cuenta[] = [];

  constructor(private cuentasService: CuentasService) {}

  ngOnInit(): void {
    this.loadCuentas();
  }

  loadCuentas(): void {
    this.cuentasService.getCuentas().subscribe({
      next: (data) => {
        this.cuentas = data;
        this.filteredCuentas = [...this.cuentas];
      },
      error: (error) => {
        console.error('Error al cargar cuentas:', error);
      }
    });
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewCuenta(): void {
    console.log('Crear nueva cuenta');
  }
}
