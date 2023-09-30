import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSliderItemComponent } from './component-slider-item.component';

describe('ComponentSliderItemComponent', () => {
  let component: ComponentSliderItemComponent;
  let fixture: ComponentFixture<ComponentSliderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentSliderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
