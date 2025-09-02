import { Component, Input } from '@angular/core';
import { ModalAtivoComponent } from '../../pages/modal-ativo/modal-ativo.component';
import { CommonModule } from '@angular/common';
import {  AtivoConsolidado } from '../../models/interfaces';

@Component({
  selector: 'app-ativo-consolidado',
  imports: [ ModalAtivoComponent, CommonModule ],
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
