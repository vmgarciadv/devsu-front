import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { ModalCuentaComponent } from '../../components/shared/modal-cuenta/modal-cuenta.component';
import { NotificationModalComponent } from '../../components/shared/notification-modal/notification-modal.component';
import { CuentasService } from '../../services/cuentas.service';
import { NotificationService } from '../../services/notification.service';
import { Cuenta } from '../../models/cuenta.model';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ModalCuentaComponent, NotificationModalComponent],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.scss'
})
export class CuentasComponent implements OnInit {
  cuentas: Cuenta[] = [];
  filteredCuentas: Cuenta[] = [];
  isModalOpen: boolean = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedCuenta: Cuenta | null = null;
  notificationState$;

  constructor(
    private cuentasService: CuentasService,
    private notificationService: NotificationService
  ) {
    this.notificationState$ = this.notificationService.notification$;
  }

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
    this.modalMode = 'create';
    this.selectedCuenta = null;
    this.isModalOpen = true;
  }

  onCloseModal(): void {
    this.isModalOpen = false;
    this.selectedCuenta = null;
  }

  onSaveCuenta(event: {data: any, isPartialUpdate: boolean, modifiedFields: string[]}): void {
    if (this.modalMode === 'create') {
      this.cuentasService.createCuenta(event.data).subscribe({
        next: () => {
          this.isModalOpen = false;
          this.notificationService.showSuccess('Operación exitosa');
          this.loadCuentas();
        },
        error: (error) => {
          this.isModalOpen = false;
          const errorMessage = error.error?.detail || error.error?.message || 'Error al crear cuenta';
          this.notificationService.showError('Error', errorMessage);
        }
      });
    }
  }

  closeNotification(): void {
    this.notificationService.close();
  }
}
