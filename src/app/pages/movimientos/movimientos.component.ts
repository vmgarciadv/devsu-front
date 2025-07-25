import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { NotificationModalComponent } from '../../components/shared/notification-modal/notification-modal.component';
import { MovimientosService } from '../../services/movimientos.service';
import { NotificationService } from '../../services/notification.service';
import { Movimiento } from '../../models/movimiento.model';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NotificationModalComponent],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.scss'
})
export class MovimientosComponent implements OnInit {
  movimientos: Movimiento[] = [];
  filteredMovimientos: Movimiento[] = [];
  notificationState$;

  constructor(
    private movimientosService: MovimientosService,
    private notificationService: NotificationService
  ) {
    this.notificationState$ = this.notificationService.notification$;
  }

  ngOnInit(): void {
    this.loadMovimientos();
  }

  loadMovimientos(): void {
    this.movimientosService.getMovimientos().subscribe({
      next: (data) => {
        this.movimientos = data;
        this.filteredMovimientos = [...this.movimientos];
      },
      error: (error) => {
        console.error('Error al cargar movimientos:', error);
      }
    });
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewMovimiento(): void {
    console.log('Crear nuevo movimiento');
  }

  closeNotification(): void {
    this.notificationService.close();
  }
}
