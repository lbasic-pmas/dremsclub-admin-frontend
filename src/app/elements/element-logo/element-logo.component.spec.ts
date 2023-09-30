import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementLogoComponent } from './element-logo.component';

describe('ElementLogoComponent', () => {
  let component: ElementLogoComponent;
  let fixture: ComponentFixture<ElementLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
