import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAtivoConsolidadoComponent } from './busca-ativo-consolidado.component';

describe('BuscaAtivoConsolidadoComponent', () => {
  let component: BuscaAtivoConsolidadoComponent;
  let fixture: ComponentFixture<BuscaAtivoConsolidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaAtivoConsolidadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaAtivoConsolidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
