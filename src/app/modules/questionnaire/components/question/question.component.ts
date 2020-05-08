import {Component, Input, OnInit, Output} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Question, QuestionType} from 'src/app/services/question/question.service';

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

  addQuestion() {
    this.showQuestionView = true;
    console.log(this.type);

    if (this.type === 'BuzzerQuestions') {
      this.question = {
        id: -1,
        title: 'Is this a new question?',
        answers: [],
        type: QuestionType.Buzzer,
      };
    } else if (this.type === 'TimeLineQuestions') {
        this.question = {
            id: -1,
            title: 'Is this a new question?',
            answers: [],
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
