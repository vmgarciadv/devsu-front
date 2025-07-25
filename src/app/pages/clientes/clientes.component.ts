import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { ModalClienteComponent } from '../../components/shared/modal-cliente/modal-cliente.component';
import { NotificationModalComponent } from '../../components/shared/notification-modal/notification-modal.component';
import { ClientesService } from '../../services/clientes.service';
import { NotificationService } from '../../services/notification.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ModalClienteComponent, NotificationModalComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  isModalOpen: boolean = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedCliente: Cliente | null = null;
  notificationState$;

  constructor(
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
      next: (data) => {
        this.clientes = data;
        this.filteredClientes = [...this.clientes];
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  onSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
  }

  onNewCliente(): void {
    this.modalMode = 'create';
    this.selectedCliente = null;
    this.isModalOpen = true;
  }

  onCloseModal(): void {
    this.isModalOpen = false;
    this.selectedCliente = null;
  }

  onSaveCliente(event: {data: any, isPartialUpdate: boolean, modifiedFields: string[]}): void {
    if (this.modalMode === 'create') {
      this.clientesService.createCliente(event.data).subscribe({
        next: (newCliente) => {
          this.clientes.push(newCliente);
          this.filteredClientes = [...this.clientes];
          this.isModalOpen = false;
          this.notificationService.showSuccess('Operación exitosa');
        },
        error: (error) => {
          this.isModalOpen = false;
          const errorMessage = error.error?.detail || error.error?.message || 'Error al crear cliente';
          this.notificationService.showError('Error', errorMessage);
        }
      });
    } else if (this.modalMode === 'edit' && this.selectedCliente && this.selectedCliente.ClienteId) {
      // Usar PATCH o PUT según el evento
      const updateMethod = event.isPartialUpdate 
        ? this.clientesService.patchCliente(this.selectedCliente.ClienteId, event.data)
        : this.clientesService.updateCliente(this.selectedCliente.ClienteId, event.data);
      
      updateMethod.subscribe({
        next: (updatedCliente) => {
          const index = this.clientes.findIndex(c => c.ClienteId === this.selectedCliente!.ClienteId);
          if (index !== -1) {
            this.clientes[index] = updatedCliente;
            this.filteredClientes = [...this.clientes];
          }
          this.isModalOpen = false;
          this.notificationService.showSuccess('Operación exitosa');
        },
        error: (error) => {
          this.isModalOpen = false;
          this.selectedCliente = null;
          const errorMessage = error.error?.detail || error.error?.message || 'Error al actualizar cliente';
          this.notificationService.showError('Error', errorMessage);
        }
      });
    }
  }

  onEditCliente(cliente: Cliente): void {
    this.modalMode = 'edit';
    this.selectedCliente = cliente;
    this.isModalOpen = true;
  }

  closeNotification(): void {
    this.notificationService.close();
  }
}