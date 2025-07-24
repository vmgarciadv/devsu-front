import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes', component: ClientesComponent },
    ]
  }
];