import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {faTimes, faAngleRight, faPlus, faCheck} from '@fortawesome/free-solid-svg-icons';
import {Answer, BuzzerAnswer, Question} from 'src/app/services/question/question.service';

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
    tempQuestion: Question = null;
    @Input() question: Question;
    @Input() questionnaire = '';
    @Input() questionType = '';
    @Output() closeClicked = new EventEmitter<MouseEvent>();
    @Output() saveQuestion = new EventEmitter();
    @Output() removeQuestion = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        this.tempQuestion = this.question;
    }

    trackByFn(index: number, answer: Answer) {
        return answer.id;
    }

    save() {
        this.saveQuestion.emit(this.tempQuestion);
        this.tempQuestion = null;
    }
    remove() {
        this.removeQuestion.emit(this.tempQuestion);
        this.tempQuestion = null;
    }

    onInputTitle(event: InputEvent) {
        this.tempQuestion.title = (event.target as HTMLInputElement).value;
    }

    onInputAnswer(index: number, event: InputEvent) {
        this.tempQuestion.answers[index].title = (event.target as HTMLInputElement).value;
    }

    onCheckboxClick(index: number) {
        (this.tempQuestion.answers[index] as BuzzerAnswer).isTrue = !(this.tempQuestion.answers[index] as BuzzerAnswer).isTrue;
    }

}
