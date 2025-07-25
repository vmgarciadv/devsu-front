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

  touched = {
    Nombre: false,
    Identificacion: false,
    Genero: false,
    Edad: false,
    Direccion: false,
    Telefono: false,
    Contrasena: false
  };

  errors: {
    Nombre?: string;
    Identificacion?: string;
    Genero?: string;
    Edad?: string;
    Direccion?: string;
    Telefono?: string;
    Contrasena?: string;
  } = {};

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

  onFieldChange(field: keyof typeof this.touched): void {
    this.touched[field] = true;
    this.validateField(field);
  }

  validateField(field: keyof typeof this.touched): void {
    this.errors[field] = '';

    switch (field) {
      case 'Nombre':
        if (!this.cliente.Nombre.trim()) {
          this.errors.Nombre = 'El nombre es requerido';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.cliente.Nombre)) {
          this.errors.Nombre = 'Solo se permiten letras';
        } else if (this.cliente.Nombre.length > 10) {
          this.errors.Nombre = 'Máximo 10 caracteres';
        }
        break;

      case 'Identificacion':
        if (!this.cliente.Identificacion.trim()) {
          this.errors.Identificacion = 'La identificación es requerida';
        } else if (!/^\d+$/.test(this.cliente.Identificacion)) {
          this.errors.Identificacion = 'Solo se permiten números';
        } else if (this.cliente.Identificacion.length > 10) {
          this.errors.Identificacion = 'Máximo 10 dígitos';
        }
        break;

      case 'Edad':
        if (!this.cliente.Edad || this.cliente.Edad <= 0) {
          this.errors.Edad = 'La edad es requerida';
        } else if (!/^\d+$/.test(this.cliente.Edad.toString())) {
          this.errors.Edad = 'Solo se permiten números';
        }
        break;

      case 'Direccion':
        if (!this.cliente.Direccion.trim()) {
          this.errors.Direccion = 'La dirección es requerida';
        } else if (this.cliente.Direccion.length > 100) {
          this.errors.Direccion = 'Máximo 100 caracteres';
        }
        break;

      case 'Telefono':
        if (!this.cliente.Telefono.trim()) {
          this.errors.Telefono = 'El teléfono es requerido';
        } else if (!/^\d+$/.test(this.cliente.Telefono)) {
          this.errors.Telefono = 'Solo se permiten números';
        } else if (this.cliente.Telefono.length > 11) {
          this.errors.Telefono = 'Máximo 11 dígitos';
        }
        break;

      case 'Contrasena':
        if (!this.cliente.Contrasena.trim()) {
          this.errors.Contrasena = 'La contraseña es requerida';
        } else if (!/[A-Z]/.test(this.cliente.Contrasena)) {
          this.errors.Contrasena = 'Debe contener al menos una mayúscula';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.cliente.Contrasena)) {
          this.errors.Contrasena = 'Debe contener al menos un carácter especial';
        }
        break;

      case 'Genero':
        if (!this.cliente.Genero) {
          this.errors.Genero = 'El género es requerido';
        }
        break;
    }
  }

  isFormValid(): boolean {
    // Validate all fields
    (Object.keys(this.touched) as Array<keyof typeof this.touched>).forEach(field => this.validateField(field));
    
    // Check if there are no errors and all required fields are filled
    return Object.values(this.errors).every(error => !error) &&
           this.cliente.Nombre.trim() !== '' &&
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
    
    // Limpiar campos touched
    (Object.keys(this.touched) as Array<keyof typeof this.touched>).forEach(key => {
      this.touched[key] = false;
    });
    
    // Limpiar errores
    this.errors = {};
  }
}