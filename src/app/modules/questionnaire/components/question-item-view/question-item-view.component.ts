import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {faTimes, faAngleRight, faPlus} from '@fortawesome/free-solid-svg-icons';
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
    @Input() question: Question;
    @Input() questionnaire = '';

    @Output() closeClicked = new EventEmitter<MouseEvent>();

    constructor() { }

    ngOnInit(): void {
    }

    trackByFn(index: number, answer: Answer) {
        return answer.id;
    }

}
