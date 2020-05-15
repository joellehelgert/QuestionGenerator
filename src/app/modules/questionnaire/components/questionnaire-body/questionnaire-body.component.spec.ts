import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireBodyComponent } from './questionnaire-body.component';
import { BuzzerAnswer, TimeLineAnswer } from 'src/app/services/question/question.service';
// buzzerQuestion
const buzzerAnswer1: BuzzerAnswer = {
  id: 1,
  title: 'Number one',
  isTrue: false,
  image: null,
};
const buzzerAnswer2: BuzzerAnswer = {
  id: 2,
  title: 'Number two',
  isTrue: false,
  image: null,
};
const buzzerAnswer3: BuzzerAnswer = {
  id: 3,
  title: 'Number three',
  isTrue: true,
  image: null,
};

// const buzzerQuestion1: Question = {
//     id: 1,
//     title: 'Whats the buzzer?',
//     answers: [buzzerAnswer1, buzzerAnswer2, buzzerAnswer3, buzzerAnswer1],
//     type: QuestionType.Buzzer
// };


// timelineQuestion
const timeLineAnswer1: TimeLineAnswer = {
  id: 1,
  title: 'Number one',
  image: null,
};
const timeLineAnswer2: TimeLineAnswer = {
  id: 2,
  title: 'Number two',
  image: null,
};
const timeLineAnswer3: TimeLineAnswer = {
  id: 3,
  title: 'Number three',
  image: null,
};

// const timeLineQuestion1: Question = {
//     id: 1,
//     title: 'Whats the Time Line?',
//     answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3, timeLineAnswer3],
//     type: QuestionType.TimeLine
// };

// const timeLineQuestion2: Question = {
//     id: 2,
//     title: 'Hello Time Line?',
//     answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3, timeLineAnswer3],
//     type: QuestionType.TimeLine
// };

// const timeLineQuestion3: Question = {
//     id: 3,
//     title: 'Whoop whoop',
//     answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3, timeLineAnswer3],
//     type: QuestionType.TimeLine
// };

// questionnaire
// const questionnaire1: Questionnaire = {
//     id: 1,
//     title: 'Questionnaire Test 1',
//     museumId: 'test-museum',
//     questions: [buzzerQuestion1,
//         buzzerQuestion1, buzzerQuestion1,
//         buzzerQuestion1, timeLineQuestion1, timeLineQuestion2, timeLineQuestion3],
//     isActive: true
// };


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
