import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirTransacaoComponent } from './excluir-transacao.component';

describe('ExcluirTransacaoComponent', () => {
  let component: ExcluirTransacaoComponent;
  let fixture: ComponentFixture<ExcluirTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
