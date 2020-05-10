import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {faTimes, faAngleRight, faPlus, faCheck} from '@fortawesome/free-solid-svg-icons';
import {Answer, Question} from 'src/app/services/question/question.service';

@Component({
  selector: 'app-question-item-view',
  templateUrl: './question-item-view.component.html',
  styleUrls: ['./question-item-view.component.scss']
})
export class QuestionItemViewComponent implements OnInit {
    faTimes = faTimes;
    faAngleRight = faAngleRight;
    faPlus = faPlus;
    faCheck = faCheck;
    questionType: string;
    tempQuestion: Question = null;
    @Input() question: Question;
    @Input() questionnaire = '';
    @Output() closeClicked = new EventEmitter<MouseEvent>();
    @Output() saveQuestion = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        // @Todo change to copy this.tempQuestion = { ...this.question };
        this.tempQuestion = this.question;
        if (this.question.type === 0) {
            this.questionType = 'TimeLineQuestions';
        } else if (this.question.type === 1) {
            this.questionType = 'BuzzerQuestions';
        }
    }

    trackByFn(index: number, answer: Answer) {
        return answer.id;
    }

    save() {
        this.saveQuestion.emit(this.tempQuestion);
        this.tempQuestion = null;
    }

    onInputTitle(event: InputEvent) {
        console.log(this.tempQuestion.title);
        this.tempQuestion.title = (event.target as HTMLInputElement).value;
        console.log(this.tempQuestion.title);
    }

    onInputAnswer(index: number, event: InputEvent) {
        this.tempQuestion.answers[index].title = (event.target as HTMLInputElement).value;
    }

    onCheckboxClick(index: number) {
        // this.tempQuestion.answers[index].isTrue = !this.tempQuestion.answers[index].isTrue;
    }

}
