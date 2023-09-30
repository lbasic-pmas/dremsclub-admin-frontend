import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementCardsComponent } from './element-cards.component';

describe('ElementCardsComponent', () => {
  let component: ElementCardsComponent;
  let fixture: ComponentFixture<ElementCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
