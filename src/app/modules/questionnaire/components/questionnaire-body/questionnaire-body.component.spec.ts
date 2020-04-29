import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireBodyComponent } from './questionnaire-body.component';

describe('QuestionnairBodyComponent', () => {
  let component: QuestionnaireBodyComponent;
  let fixture: ComponentFixture<QuestionnaireBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireBodyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
