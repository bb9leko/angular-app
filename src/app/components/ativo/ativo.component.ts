import { Component, Input } from '@angular/core';
import { ModalAtivoComponent } from '../../pages/modal-ativo/modal-ativo.component';
import { CommonModule } from '@angular/common';
import { Ativo, AtivoConsolidado } from '../../models/interfaces';

@Component({
  selector: 'app-ativo',
  imports: [ ModalAtivoComponent, CommonModule ],
  templateUrl: './ativo.component.html',
  styleUrl: './ativo.component.scss'
})
export class AtivoComponent {

  @Input() ativo!: Ativo | AtivoConsolidado;
  modalAberto: boolean = false;

  onModelChange(evento: boolean) {
    this.modalAberto = evento;
  }
}


