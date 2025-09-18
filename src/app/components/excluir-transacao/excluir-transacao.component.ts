import { Component } from '@angular/core';
import { Transacao } from '../../core/services/transacao';
import { TransacaoService } from '../../core/services/transacao.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-excluir-transacao',
  imports: [],
  templateUrl: './excluir-transacao.component.html',
  styleUrl: './excluir-transacao.component.scss'
})
export class ExcluirTransacaoComponent {

  transacao: Transacao = {
    id: 0,
    dataEvento: '',
    corretora: '',
    classificacaoAtivo: '',
    ticket: '',
    compraOUVenda: '',
    quantidade: 0,
    valorUnitario: 0,
    valorTotal: 0,
    valorTaxaLiquidacao: 0,
    valorTaxasEmolumentos: 0,
    valorImpostos: 0,
    outrosValoresCobrados: 0,
    valorCorretagem: 0,
    valorTotalComCustosEDespesas: 0
  }

  constructor(
    private service: TransacaoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((transacao) => {
      this.transacao = transacao
    })
  }

  excluirTransacao() {
    if(this.transacao.id) {
      this.service.excluirTransacao(this.transacao.id).subscribe(() => {
        alert('Transação excluída com sucesso!')
        this.router.navigate(['/busca-ativo'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarTransacao'])
  }

}
