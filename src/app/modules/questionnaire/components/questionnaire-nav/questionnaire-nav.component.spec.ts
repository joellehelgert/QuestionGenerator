import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireNavComponent } from './questionnaire-nav.component';

describe('QuestionnairNavComponent', () => {
  let component: QuestionnaireNavComponent;
  let fixture: ComponentFixture<QuestionnaireNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireNavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
