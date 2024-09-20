import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChalisaComponent } from './chalisa.component';

describe('ChalisaComponent', () => {
  let component: ChalisaComponent;
  let fixture: ComponentFixture<ChalisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChalisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChalisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
