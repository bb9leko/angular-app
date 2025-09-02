import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAtivoComponent } from './busca-ativo.component';

describe('BuscaAtivoComponent', () => {
  let component: BuscaAtivoComponent;
  let fixture: ComponentFixture<BuscaAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaAtivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
