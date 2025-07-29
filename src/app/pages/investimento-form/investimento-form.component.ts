import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-investimento-form',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatCardModule, 
    ReactiveFormsModule,
    MatDividerModule,
    NgxMaskDirective    
  ],
  providers: [provideNgxMask()],
  templateUrl: './investimento-form.component.html',
  styleUrls: ['./investimento-form.component.scss']
})
export class InvestimentoFormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      classificacaoAtivo: [null, Validators.required],
      ticket: [null, Validators.required],
      dataEvento: [null, Validators.required],
      quantidade: [null, Validators.required],
      valorUnitario: [null, Validators.required],
      valorTotal: [{value: null, disabled: true}], // campo calculado, desabilitado para edição
      valorCorretagem: [null, Validators.required],
      valorTaxasEmolumentos: [null, Validators.required],
      valorTaxaLiquidacao: [null, Validators.required],
      valorImpostos: [null, Validators.required],
      outrosValoresCobrados: [null],
      valorTotalComCustosEDespesas: [{ value: null, disabled: true }],
      compraOUVenda: [null, Validators.required],
      corretora: [null, Validators.required]
    });

    this.form.get('quantidade')!.valueChanges.subscribe(() => this.atualizarValorTotal());
    this.form.get('valorUnitario')!.valueChanges.subscribe(() => this.atualizarValorTotal());
    this.form.valueChanges.subscribe(() => this.atualizarValorTotalComCustos());
  }

  atualizarValorTotal() {
    const quantidade = Number(this.form.get('quantidade')!.value) || 0;
    const valorUnitario = Number(this.form.get('valorUnitario')!.value) || 0;
    const total = quantidade * valorUnitario;
    this.form.get('valorTotal')!.setValue(total ? total.toFixed(2) : '', { emitEvent: false });
  }

  atualizarValorTotalComCustos() {
    const total = Number(this.form.get('valorTotal')!.value) || 0;
    const corretagem = Number(this.form.get('valorCorretagem')!.value) || 0;
    const taxas = Number(this.form.get('valorTaxasEmolumentos')!.value) || 0;
    const liquidacao = Number(this.form.get('valorTaxaLiquidacao')!.value) || 0;
    const impostos = Number(this.form.get('valorImpostos')!.value) || 0;
    const outros = Number(this.form.get('outrosValoresCobrados')!.value) || 0;
    const totalFinal = total + corretagem + taxas + liquidacao + impostos + outros;
    this.form.get('valorTotalComCustosEDespesas')!.setValue(totalFinal ? totalFinal.toFixed(2) : '', { emitEvent: false });
  }

}
