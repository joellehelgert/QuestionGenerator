import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Questionnaire } from '../../../../services/questionnaire/questionnaire.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questionnaire-nav',
  templateUrl: './questionnaire-nav.component.html',
  styleUrls: ['./questionnaire-nav.component.scss']
})
export class QuestionnaireNavComponent implements OnInit {
  faAngle = faAngleDown;
  selectOpen = false;

  @Input() activeQuestionnaireItem: Questionnaire;
  @Input() questionnaires: Observable<Questionnaire>;
  @Output() changeQuestionnaire = new EventEmitter<Questionnaire>();

  constructor() { }

  ngOnInit(): void {}

  onOpen() {
    this.selectOpen = !this.selectOpen;
    if (this.selectOpen) {
      this.faAngle = faAngleUp;
    } else {
      this.faAngle = faAngleDown;
    }
  }

  onClick(questionnaire: Questionnaire) {
    this.changeQuestionnaire.emit(questionnaire);
    this.selectOpen = false;
    this.faAngle = faAngleDown;
  }
}
