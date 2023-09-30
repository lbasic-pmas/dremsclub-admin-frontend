import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementArticleComponent } from './element-article.component';

describe('ElementArticleComponent', () => {
  let component: ElementArticleComponent;
  let fixture: ComponentFixture<ElementArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
