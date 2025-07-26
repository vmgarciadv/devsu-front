import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { NotificationModalComponent } from '../../components/shared/notification-modal/notification-modal.component';
import { ModalMovimientoComponent } from '../../components/shared/modal-movimiento/modal-movimiento.component';
import { MovimientosService } from '../../services/movimientos.service';
import { NotificationService } from '../../services/notification.service';
import { Movimiento } from '../../models/movimiento.model';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NotificationModalComponent, ModalMovimientoComponent],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.scss'
})
export class MovimientosComponent implements OnInit {
  movimientos: Movimiento[] = [];
  filteredMovimientos: Movimiento[] = [];
  notificationState$;
  isModalOpen: boolean = false;

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
    this.isModalOpen = true;
  }

  onCloseModal(): void {
    this.isModalOpen = false;
  }

  onSaveMovimiento(data: any): void {
    this.movimientosService.createMovimiento(data).subscribe({
      next: () => {
        this.isModalOpen = false;
        this.notificationService.showSuccess('Movimiento creado exitosamente');
        this.loadMovimientos();
      },
      error: (error) => {
        this.isModalOpen = false;
        const errorMessage = error.error?.detail || error.error?.message || 'Error al crear movimiento';
        this.notificationService.showError('Error', errorMessage);
      }
    });
  }

  closeNotification(): void {
    this.notificationService.close();
  }
}
