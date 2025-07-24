import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-movimientos',
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.scss'
})
export class MovimientosComponent {
  movimientos: any[] = [];
  filteredMovimientos: any[] = [];

  ngOnInit(): void {
    this.loadMovimientos();
  }

  loadMovimientos(): void {
    this.filteredMovimientos = [...this.movimientos];
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewMovimiento(): void {
    console.log('Crear nuevo movimiento');
  }
}
