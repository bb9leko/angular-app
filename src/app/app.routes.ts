import { Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent }, // Substitua por outro componente se necessário
];
