import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDividendosComponent } from './upload-dividendos.component';

describe('UploadDividendosComponent', () => {
  let component: UploadDividendosComponent;
  let fixture: ComponentFixture<UploadDividendosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDividendosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDividendosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
