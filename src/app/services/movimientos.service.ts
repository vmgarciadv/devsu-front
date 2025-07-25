import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from '../models/movimiento.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) { }

  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }

  createMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, movimiento);
  }

  updateMovimiento(id: number, movimiento: Partial<Movimiento>): Observable<Movimiento> {
    return this.http.put<Movimiento>(`${this.apiUrl}/${id}`, movimiento);
  }

  patchMovimiento(id: number, movimiento: Partial<Movimiento>): Observable<Movimiento> {
    return this.http.patch<Movimiento>(`${this.apiUrl}/${id}`, movimiento);
  }

  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}