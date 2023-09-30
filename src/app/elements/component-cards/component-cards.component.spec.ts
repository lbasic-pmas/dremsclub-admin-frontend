import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCardsComponent } from './component-cards.component';

describe('ComponentCardsComponent', () => {
  let component: ComponentCardsComponent;
  let fixture: ComponentFixture<ComponentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
