import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionItemViewComponent } from './question-item-view.component';

describe('QuestionItemViewComponent', () => {
  let component: QuestionItemViewComponent;
  let fixture: ComponentFixture<QuestionItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
