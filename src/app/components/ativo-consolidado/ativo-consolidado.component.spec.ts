import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivoConsolidadoComponent } from './ativo-consolidado.component';

describe('AtivoConsolidadoComponent', () => {
  let component: AtivoConsolidadoComponent;
  let fixture: ComponentFixture<AtivoConsolidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtivoConsolidadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivoConsolidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
