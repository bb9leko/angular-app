import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ativo, AtivoConsolidado } from '../../models/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ativo',
  imports: [ CommonModule , RouterLink ],
  templateUrl: './ativo.component.html',
  styleUrl: './ativo.component.scss'
})
export class AtivoComponent {

  @Input() ativo!: Ativo ;
  modalAberto: boolean = false;

  onModelChange(evento: boolean) {
    this.modalAberto = evento;
  }
}


