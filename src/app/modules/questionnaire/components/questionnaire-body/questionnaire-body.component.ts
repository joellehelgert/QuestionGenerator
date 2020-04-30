import { Component, OnInit } from '@angular/core';

export interface Questionnaire {
  id: number;
  title: string;
  buzzerQuestions: BuzzerQuestion[];
  timeLineQuestions: TimeLineQuestion[];
  isActive: boolean;
}

export interface Answer {
    id: number;
    title: string;
}

export interface Question {
    id: number;
    title: string;
}

export interface BuzzerAnswer extends Answer{
    isTrue: boolean;
}

export interface BuzzerQuestion extends Question{
    answers: BuzzerAnswer[];
}

export interface TimeLineAnswer extends Answer{
    image?: ImageData;
}

export interface TimeLineQuestion extends Question{
    answers: TimeLineAnswer[];
}

// buzzerQuestion
const buzzerAnswer1: BuzzerAnswer = {
  id: 1,
  title: 'Number one',
  isTrue: false,
};
const buzzerAnswer2: BuzzerAnswer = {
    id: 2,
    title: 'Number two',
    isTrue: false,
};
const buzzerAnswer3: BuzzerAnswer = {
    id: 3,
    title: 'Number three',
    isTrue: true,
};

const buzzerQuestion1: BuzzerQuestion = {
  id: 1,
  title: 'Whats the buzzer?',
  answers: [buzzerAnswer1, buzzerAnswer2, buzzerAnswer3]
};


// timelineQuestion
const timeLineAnswer1: TimeLineAnswer = {
    id: 1,
    title: 'Number one',
};
const timeLineAnswer2: TimeLineAnswer = {
    id: 2,
    title: 'Number two',
};
const timeLineAnswer3: TimeLineAnswer = {
    id: 3,
    title: 'Number three',
};

const timeLineQuestion1: TimeLineQuestion = {
    id: 1,
    title: 'Whats the Time Line?',
    answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3]
};

const timeLineQuestion2: TimeLineQuestion = {
    id: 2,
    title: 'Hello Time Line?',
    answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3]
};

const timeLineQuestion3: TimeLineQuestion = {
    id: 3,
    title: 'Whoop whoop',
    answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3]
};

// questionnaire
const questionnaire1: Questionnaire = {
    id: 1,
    title: 'Questionnaire Test 1',
    buzzerQuestions: [buzzerQuestion1, buzzerQuestion1, buzzerQuestion1, buzzerQuestion1],
    timeLineQuestions: [timeLineQuestion1, timeLineQuestion2, timeLineQuestion3],
    isActive: true
};


@Component({
  selector: 'app-questionnaire-body',
  templateUrl: './questionnaire-body.component.html',
  styleUrls: ['./questionnaire-body.component.scss']
})
export class QuestionnaireBodyComponent implements OnInit {
  questionnaires = [questionnaire1];
  questionnaire = questionnaire1;

  constructor() {
  }

  ngOnInit(): void {
  }

}
