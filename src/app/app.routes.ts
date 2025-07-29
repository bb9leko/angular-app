import { Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { InvestimentoFormComponent } from './pages/investimento-form/investimento-form.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent }, 
  { path: 'investimento-form', component: InvestimentoFormComponent }, 
];
