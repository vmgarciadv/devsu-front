import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  reportes: any[] = [];
  filteredReportes: any[] = [];

  ngOnInit(): void {
    this.loadReportes();
  }

  loadReportes(): void {
    this.filteredReportes = [...this.reportes];
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewReporte(): void {
    console.log('Crear nuevo cliente');
  }
}
