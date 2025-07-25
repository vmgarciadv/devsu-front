import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-modal-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss']
})
export class ModalClienteComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveCliente = new EventEmitter<Cliente>();

  cliente: Cliente & { Contrasena: string } = {
    Nombre: '',
    Genero: '',
    Edad: 0,
    Identificacion: '',
    Direccion: '',
    Telefono: '',
    Estado: true,
    Contrasena: ''
  };

  onClose(): void {
    this.closeModal.emit();
    this.resetForm();
  }

  onSave(): void {
    if (this.isFormValid()) {
      const { Estado, ...clienteData } = this.cliente;
      // Convertir genero en M o F
      const dataToSend = {
        ...clienteData,
        Genero: clienteData.Genero === 'Masculino' ? 'M' : clienteData.Genero === 'Femenino' ? 'F' : clienteData.Genero
      };
      this.saveCliente.emit(dataToSend as any);
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return this.cliente.Nombre.trim() !== '' &&
           this.cliente.Identificacion.trim() !== '' &&
           this.cliente.Genero.trim() !== '' &&
           this.cliente.Edad > 0 &&
           this.cliente.Direccion.trim() !== '' &&
           this.cliente.Telefono.trim() !== '' &&
           this.cliente.Contrasena.trim() !== '';
  }

  private resetForm(): void {
    this.cliente = {
      Nombre: '',
      Genero: '',
      Edad: 0,
      Identificacion: '',
      Direccion: '',
      Telefono: '',
      Estado: true,
      Contrasena: ''
    };
  }
}