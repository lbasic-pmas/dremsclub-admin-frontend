import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementMenuHeaderComponent } from './element-menu-header.component';

describe('ElementMenuHeaderComponent', () => {
  let component: ElementMenuHeaderComponent;
  let fixture: ComponentFixture<ElementMenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementMenuHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
