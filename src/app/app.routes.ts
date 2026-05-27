import { Routes } from '@angular/router';
import { BuscaAtivoComponent } from './pages/busca-ativo/busca-ativo.component';
import { InvestimentoFormComponent } from './pages/investimento-form/investimento-form.component';
import { BuscaAtivoConsolidadoComponent } from './pages/busca-ativo-consolidado/busca-ativo-consolidado.component';
import { ExcluirTransacaoComponent } from './components/excluir-transacao/excluir-transacao.component';
import { EditarTransacaoComponent } from './components/editar-transacao/editar-transacao.component';
import { UploadDividendosComponent } from './pages/upload-dividendos/upload-dividendos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'busca-ativo', pathMatch: 'full' },
  { path: 'busca-ativo', component: BuscaAtivoComponent }, 
  { path: 'investimento-form', component: InvestimentoFormComponent },
  { path: 'busca-ativo-consolidado', component: BuscaAtivoConsolidadoComponent },
  { path: 'excluir-transacao/:id', component: ExcluirTransacaoComponent },
  { path: 'editar-transacao/:id', component: EditarTransacaoComponent },
  { path: 'upload-dividendos', component: UploadDividendosComponent }
];
