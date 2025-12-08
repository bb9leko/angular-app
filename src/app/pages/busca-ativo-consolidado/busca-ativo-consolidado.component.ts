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
  loading: boolean = false

  constructor(private service: TransacaoService) {}

  ngOnInit(): void {
    this.carregarTodosAtivos();
  }

  carregarTodosAtivos() {
    this.loading = true;

  this.subscription = this.service.buscarAtivosConsolidado().pipe(
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
