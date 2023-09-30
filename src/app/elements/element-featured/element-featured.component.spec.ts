import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementFeaturedComponent } from './element-featured.component';

describe('ElementFeaturedComponent', () => {
  let component: ElementFeaturedComponent;
  let fixture: ComponentFixture<ElementFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
