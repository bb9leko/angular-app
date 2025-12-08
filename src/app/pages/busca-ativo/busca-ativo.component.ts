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

  listaAtivos!: Ativo[]
  listaTransacoes: Transacao[] = []
  campoBusca: string = ''
  subscription!: Subscription
  ativo!: Ativo


  constructor(private service: TransacaoService) {}
  
  //Não está sendo usado, apenas carrega o endpoint no console 
  ngOnInit(): void {
    this.service.listar().subscribe((listaTransacoes) => {
      console.log('Lista de transações:', listaTransacoes);
      this.listaTransacoes = listaTransacoes;
    });
  }

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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
