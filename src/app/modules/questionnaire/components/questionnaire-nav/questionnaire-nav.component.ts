import { Component, OnInit, Input } from '@angular/core';
import { Questionnaire } from '../../../../services/questionnaire/questionnaire.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questionnaire-nav',
  templateUrl: './questionnaire-nav.component.html',
  styleUrls: ['./questionnaire-nav.component.scss']
})
export class QuestionnaireNavComponent implements OnInit {
  @Input() questionnaires: Observable<Questionnaire>;

  constructor() { }

  ngOnInit(): void {
  }

}
