import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFeaturedComponent } from './component-featured.component';

describe('ComponentFeaturedComponent', () => {
  let component: ComponentFeaturedComponent;
  let fixture: ComponentFixture<ComponentFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
