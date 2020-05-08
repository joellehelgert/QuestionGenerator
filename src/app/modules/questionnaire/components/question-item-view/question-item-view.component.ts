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
    @Input() question: Question;
    @Input() questionnaire = '';

    @Output() closeClicked = new EventEmitter<MouseEvent>();

    constructor() { }

    ngOnInit(): void {
        if (this.question.type === 0) {
            this.questionType = 'TimeLineQuestions';
        } else if (this.question.type === 1) {
            this.questionType = 'BuzzerQuestions';
        }
    }

    trackByFn(index: number, answer: Answer) {
        return answer.id;
    }

}
