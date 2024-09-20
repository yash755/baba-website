import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AartiComponent } from './aarti.component';

describe('AartiComponent', () => {
  let component: AartiComponent;
  let fixture: ComponentFixture<AartiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AartiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AartiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
