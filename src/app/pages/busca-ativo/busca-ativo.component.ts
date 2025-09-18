import { Component, OnDestroy } from '@angular/core';
import { TransacaoService } from '../../core/services/transacao.service';
import { Transacao } from '../../core/services/transacao';
import { Ativo , AtivoConsolidado, AtivosResultado } from '../../models/interfaces'
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AtivoComponent } from '../../components/ativo/ativo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busca-ativo',
  imports: [ FormsModule, AtivoComponent, CommonModule ],
  templateUrl: './busca-ativo.component.html',
  styleUrl: './busca-ativo.component.scss'
})
export class BuscaAtivoComponent implements OnDestroy {

  listaAtivos!: Ativo[];
  listaTransacoes: Transacao[] = [];
  campoBusca: string = ''
  subscription!: Subscription
  ativo!: Ativo

  constructor(private service: TransacaoService) {}


  
  //ngOnInit(): void {
  //  this.service.listar().subscribe((listaTransacoes) => {
  //    console.log('Lista de transações:', listaTransacoes);
  //    this.listaTransacoes = listaTransacoes;
  //  });    
  //}

  //buscarAtivos() {
  //  this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //    next: (items) => {
  //      this.listaAtivos = this.ativosResultadoParaAtivos(items)
  //    },
  //    error: erro => console.error(erro),
  //  });
  // }

  buscarAtivos() {
    this.subscription = this.service.buscarAtivos(this.campoBusca).subscribe({
      next: (ativos) => {
        this.listaAtivos = ativos;

        if (ativos.length === 0) {
          alert("Nenhum ativo encontrado para o termo pesquisado.");
        }
      },
      error: erro => { 
        console.error(erro);
        alert('Erro ao buscar ativos. Tente novamente...');
      }
    });
  }
  

  ativosResultadoParaAtivos(items: any): Ativo[] {
    const ativos: Ativo[] = []
    
    items.forEach((item: any) => {
      ativos.push( this.ativo = {
        id: item.id,
        classificacaoAtivo: item.classificacaoAtivo?.classificacaoAtivo,
        compraOUVenda: item.compraOUVenda?.compraOUVenda,
        corretora: item.corretora?.corretora,
        dataEvento: item.dataEvento?.dataEvento,
        outrosValoresCobrados: item.outrosValoresCobrados?.outrosValoresCobrados,
        quantidade: item.quantidade?.quantidade,
        ticket: item.ticket?.ticket,        
        valorCorretagem: item.valorCorretagem?.valorCorretagem,
        valorImpostos: item.valorImpostos?.valorImpostos,
        valorTaxaLiquidacao: item.valorTaxaLiquidacao?.valorTaxaLiquidacao,
        valorTaxasEmolumentos: item.valorTaxasEmolumentos?.valorTaxasEmolumentos,
        valorTotal: item.valorTotal?.valorTotal,
        valorTotalComCustosEDespesas: item.valorTotalComCustosEDespesas?.valorTotalComCustosEDespesas,
        valorUnitario: item.valorUnitario?.valorUnitario
      })
    })
    return ativos
  } 

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
