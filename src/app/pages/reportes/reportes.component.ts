import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationModalComponent } from '../../components/shared/notification-modal/notification-modal.component';
import { ReportesService } from '../../services/reportes.service';
import { ClientesService } from '../../services/clientes.service';
import { NotificationService } from '../../services/notification.service';
import { Reporte } from '../../models/reporte.model';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationModalComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {
  reportes: Reporte[] = [];
  clientes: Cliente[] = [];
  notificationState$;
  
  // Filter controls
  selectedCliente: string = '';
  useDateRange: boolean = false;
  singleDate: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  
  constructor(
    private reportesService: ReportesService,
    private clientesService: ClientesService,
    private notificationService: NotificationService
  ) {
    this.notificationState$ = this.notificationService.notification$;
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  onGenerateReport(): void {
    if (!this.selectedCliente) {
      this.notificationService.showError('Error', 'Debe seleccionar un cliente');
      return;
    }

    if (!this.useDateRange && !this.singleDate) {
      this.notificationService.showError('Error', 'Debe seleccionar una fecha');
      return;
    }

    if (this.useDateRange && (!this.fechaInicio || !this.fechaFin)) {
      this.notificationService.showError('Error', 'Debe seleccionar ambas fechas del rango');
      return;
    }

    const fecha = this.useDateRange ? undefined : this.singleDate;
    const fechaInicio = this.useDateRange ? this.fechaInicio : undefined;
    const fechaFin = this.useDateRange ? this.fechaFin : undefined;

    this.reportesService.getReportes(this.selectedCliente, fecha, fechaInicio, fechaFin).subscribe({
      next: (data) => {
        this.reportes = data;
        if (data.length === 0) {
          this.notificationService.showError('Sin datos', 'No se encontraron movimientos para los criterios seleccionados');
        }
      },
      error: (error) => {
        const errorMessage = error.error?.detail || error.error?.message || 'Error al generar reporte';
        this.notificationService.showError('Error', errorMessage);
      }
    });
  }

  toggleDateMode(): void {
    this.singleDate = '';
    this.fechaInicio = '';
    this.fechaFin = '';
  }

  closeNotification(): void {
    this.notificationService.close();
  }
}
