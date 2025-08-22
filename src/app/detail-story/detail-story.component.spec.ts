import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStoryComponent } from './detail-story.component';

describe('DetailStoryComponent', () => {
  let component: DetailStoryComponent;
  let fixture: ComponentFixture<DetailStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
