import { Component, OnDestroy } from '@angular/core';
import { TransacaoService } from '../../core/services/transacao.service';
import { Transacao } from '../../core/services/transacao';
import { Ativo , AtivoConsolidado, AtivosResultado } from '../../models/interfaces'
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AtivoComponent } from '../../components/ativo/ativo.component';
import { CommonModule } from '@angular/common';
import { AtivoConsolidadoComponent } from "../../components/ativo-consolidado/ativo-consolidado.component";

@Component({
  selector: 'app-busca-ativo-consolidado',
  imports: [FormsModule, CommonModule, AtivoConsolidadoComponent],
  templateUrl: './busca-ativo-consolidado.component.html',
  styleUrl: './busca-ativo-consolidado.component.scss'
})
export class BuscaAtivoConsolidadoComponent implements OnDestroy{
  listaAtivos!: AtivoConsolidado[];
  listaTransacoes: Transacao[] = [];
  campoBusca: string = ''
  subscription!: Subscription
  ativo!: AtivoConsolidado

  constructor(private service: TransacaoService) {}

  buscarAtivosConsolidado() {
  this.subscription = this.service.buscarAtivos(this.campoBusca).pipe(
    map(transacoes => this.consolidarAtivosPorTicket(transacoes)),
    map(ativosConsolidados => ativosConsolidados.filter(ativo => ativo.quantidadeTotal > 0))
  ).subscribe({
    next: (ativosConsolidados) => {
      this.listaAtivos = ativosConsolidados;
      if (ativosConsolidados.length === 0) {
        alert("Nenhum ativo encontrado para o termo pesquisado.");
      }
    },
    error: erro => { 
      console.error(erro);
      alert('Erro ao buscar ativos. Tente novamente...');
    },
    complete: () => {
      console.log('Busca de ativos completada');
    }
  });
}

private consolidarAtivosPorTicket(transacoes: Ativo[]): AtivoConsolidado[] {
  // Agrupa transações por ticket
  const agrupadas = transacoes.reduce((acc, transacao) => {
    const key = transacao.ticket;
    
    if (!acc[key]) {
      acc[key] = {
        ...transacao,
        quantidadeTotal: 0,
        valorTotalConsolidado: 0,
        numeroTransacoes: 0,
        precoMedio: 0
      };
    }
    
    // Consolida os valores
    acc[key].quantidadeTotal += transacao.quantidade || 0;
    acc[key].valorTotalConsolidado += transacao.valorTotal || 0;
    acc[key].numeroTransacoes++;
    
    return acc;
  }, {} as { [key: string]: AtivoConsolidado });

  // Calcula preço médio e retorna array
  return Object.values(agrupadas).map(ativo => ({
    ...ativo,
    precoMedio: ativo.quantidadeTotal > 0 ? 
      ativo.valorTotalConsolidado / ativo.quantidadeTotal : 0
    }));
  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
