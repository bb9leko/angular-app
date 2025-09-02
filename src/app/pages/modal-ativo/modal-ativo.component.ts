import { CommonModule } from '@angular/common';
import { Inject, Component, EventEmitter, Input, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

//const body = document.querySelector("body");

@Component({
  selector: 'app-modal-ativo',
  imports: [ CommonModule ],
  templateUrl: './modal-ativo.component.html',
  styleUrl: './modal-ativo.component.scss'
})
export class ModalAtivoComponent {

  constructor(@Inject(PLATFORM_ID) public platformId: Object) { }

  @Input() ativo!: Object;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter()

  fecharModal() {
    this.statusModal = false
    this.mudouModal.emit(this.statusModal)
    if (isPlatformBrowser(this.platformId)) {
    const body = document.querySelector("body");
    if (body) body.style.overflow = "scroll";
  }
  }

  esconderScroll(){
    if (this.statusModal && isPlatformBrowser(this.platformId)) {
      const body = document.querySelector("body");
      if (body) body.style.overflow = "hidden";
    }
  }

  lerPrevia() {
    window.open( '_blank');
  }
  

}

