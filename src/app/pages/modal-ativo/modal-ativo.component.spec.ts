import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtivoComponent } from './modal-ativo.component';

describe('ModalAtivoComponent', () => {
  let component: ModalAtivoComponent;
  let fixture: ComponentFixture<ModalAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAtivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
