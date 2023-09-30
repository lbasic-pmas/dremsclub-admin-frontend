import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSliderComponent } from './element-slider.component';

describe('ElementSliderComponent', () => {
  let component: ElementSliderComponent;
  let fixture: ComponentFixture<ElementSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
