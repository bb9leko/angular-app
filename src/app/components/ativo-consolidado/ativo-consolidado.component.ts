import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AtivoConsolidado } from '../../models/interfaces';

@Component({
  selector: 'app-ativo-consolidado',
  imports: [ CommonModule ],
  templateUrl: './ativo-consolidado.component.html',
  styleUrl: './ativo-consolidado.component.scss'
})
export class AtivoConsolidadoComponent {

  @Input() ativo!: AtivoConsolidado;
  modalAberto: boolean = false;

  onModelChange(evento: boolean) {
    this.modalAberto = evento;
  }

}
