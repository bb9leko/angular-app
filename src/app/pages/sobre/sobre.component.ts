import { Component } from '@angular/core';
import { TransacaoService } from '../../core/services/transacao.service';
import { Transacao } from '../../core/services/transacao';

@Component({
  selector: 'app-sobre',
  imports: [],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss'
})
export class SobreComponent {
  listaTransacoes: Transacao[] = [];
  
  constructor(private service: TransacaoService) {}

  ngOnInit(): void {
    this.service.listar().subscribe((listaTransacoes) => {
      console.log('Lista de transações:', listaTransacoes);
      this.listaTransacoes = listaTransacoes;
    });    
  }
}
