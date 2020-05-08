import {Component, Input, OnInit, Output} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {BuzzerAnswer, Question, QuestionType, TimeLineAnswer} from 'src/app/services/question/question.service';
import {tryReadFile} from "../../../../../../node_modules/tslint/lib/files/reading";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  faPlus = faPlus;
  showQuestionView = false;
  question: Question;

  @Input() questionnaireTitle = '';
  @Input() questions: Question[] = [];
  @Input() type = '';


  constructor() { }

  ngOnInit(): void {
  }
  /*
  export interface Answer {
  id: number;
  title: string;
}
export interface BuzzerAnswer extends Answer {
  isTrue: boolean;
}

export interface TimeLineAnswer extends Answer {
  image?: ImageData;
}
   */

  addQuestion() {
    this.showQuestionView = true;

    if (this.type === 'BuzzerQuestions') {
        const answerTrue: BuzzerAnswer = {
            id: -1,
            title: 'Your BuzzerQuestion Answer here',
            image: null,
            isTrue: true
        };
        const answerFalse: BuzzerAnswer = {
            id: -1,
            title: 'Your BuzzerQuestion Answer here',
            image: null,
            isTrue: false
        };
        this.question = {
        id: -1,
        title: 'Is this a new question?',
        answers: [answerTrue, answerFalse, answerFalse, answerFalse],
        type: QuestionType.Buzzer,
      };
    } else if (this.type === 'TimeLineQuestions') {
        const answer: TimeLineAnswer = {
            id: -1,
            title: 'Your TimeLineQuestion Answer here',
            image: null
        };
        this.question = {
            id: -1,
            title: 'Is this a new question?',
            answers: [answer, answer, answer, answer],
            type: QuestionType.TimeLine,
        };
    }
  }

  updateQuestion(question: Question) {
      this.showQuestionView = true;
      this.question = question;
  }

  onCloseClicked() {
      this.showQuestionView = false;
  }
}
