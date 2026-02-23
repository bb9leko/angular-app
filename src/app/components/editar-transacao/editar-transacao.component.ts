import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { TransacaoService } from '../../core/services/transacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transacao } from '../../core/services/transacao';

@Component({
  selector: 'app-editar-transacao',
  imports: [ 
      MatFormFieldModule, 
      MatInputModule, 
      MatSelectModule, 
      MatCardModule, 
      ReactiveFormsModule,
      MatDividerModule,
      NgxMaskDirective,
      MatButtonModule 
    ],
  templateUrl: './editar-transacao.component.html',
  styleUrl: './editar-transacao.component.scss'
})
export class EditarTransacaoComponent {

  form!: FormGroup;

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
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
     this.form = this.fb.group({
      id: [0],
      dataEvento: ['', Validators.required],
      corretora: ['', Validators.required],
      classificacaoAtivo: ['', Validators.required],
      ticket: ['', Validators.required],
      compraOUVenda: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]],
      valorUnitario: [0, [Validators.required, Validators.min(0)]],
      valorTotal: [0, [Validators.required, Validators.min(0)]],
      valorTaxaLiquidacao: [0, [Validators.required, Validators.min(0)]],
      valorTaxasEmolumentos: [0, [Validators.required, Validators.min(0)]],
      valorImpostos: [0, [Validators.required, Validators.min(0)]],
      outrosValoresCobrados: [0, [Validators.required, Validators.min(0)]],
      valorCorretagem: [0, [Validators.required, Validators.min(0)]],
      valorTotalComCustosEDespesas: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((transacao) => {
      this.form.patchValue(transacao); // Preenche os valores no form já existente
      this.transacao = transacao;
    });
    // Atualiza valorTotal quando quantidade ou valorUnitario mudam
  this.form.get('quantidade')?.valueChanges.subscribe(() => this.atualizarValores());
  this.form.get('valorUnitario')?.valueChanges.subscribe(() => this.atualizarValores());

  // Atualiza valorTotalComCustosEDespesas quando qualquer campo de custo/despesa muda
  [
    'valorTotal',
    'valorCorretagem',
    'valorTaxasEmolumentos',
    'valorTaxaLiquidacao',
    'valorImpostos',
    'outrosValoresCobrados'
  ].forEach(campo => {
    this.form.get(campo)?.valueChanges.subscribe(() => this.atualizarValores());
  });
}

// ...existing code...
atualizarValores() {
  const quantidade = Number(this.form.get('quantidade')?.value) || 0;
  const valorUnitario = Number(this.form.get('valorUnitario')?.value) || 0;
  const valorTotal = parseFloat((quantidade * valorUnitario).toFixed(2));

  this.form.get('valorTotal')?.setValue(valorTotal, { emitEvent: false });

  const valorCorretagem = Number(this.form.get('valorCorretagem')?.value) || 0;
  const valorTaxasEmolumentos = Number(this.form.get('valorTaxasEmolumentos')?.value) || 0;
  const valorTaxaLiquidacao = Number(this.form.get('valorTaxaLiquidacao')?.value) || 0;
  const valorImpostos = Number(this.form.get('valorImpostos')?.value) || 0;
  const outrosValoresCobrados = Number(this.form.get('outrosValoresCobrados')?.value) || 0;

  const valorTotalComCustosEDespesas = parseFloat((
    valorTotal +
    valorCorretagem +
    valorTaxasEmolumentos +
    valorTaxaLiquidacao +
    valorImpostos +
    outrosValoresCobrados
  ).toFixed(2));

  this.form.get('valorTotalComCustosEDespesas')?.setValue(valorTotalComCustosEDespesas, { emitEvent: false });
}


editarTransacao() {
  this.service.editarTransacao(this.transacao).subscribe(() => {
    this.router.navigate(['/investimento-form'])
  })
}

cancelar() {
  this.router.navigate(['/busca-ativo'])
}

transformarTicketParaCaixaAlta(event: any) {
  const valor = event.target.value.toUpperCase();
  this.form.get('ticket')?.setValue(valor, { emitEvent: false });
}

onClick() {
  if (this.form.valid) {
    console.log('Dados do formulário:', this.form.getRawValue());
    this.service.editarTransacao(this.form.getRawValue()).subscribe({
      next: (res) => {
        // sucesso, faça algo com a resposta
        console.log('Transação enviada com sucesso!', res);
        alert('Transação enviada com sucesso!');
        this.form.reset(); 
      },
      error: (err) => {
        // erro, trate o erro
        console.error('Erro ao enviar transação:', err);
        alert('Erro ao enviar transação. Por favor, tente novamente.');
      },
      complete: () => {
        console.log('Formulário Completado');
      }        
    });
  } else {
      console.log('Formulário inválido');
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
