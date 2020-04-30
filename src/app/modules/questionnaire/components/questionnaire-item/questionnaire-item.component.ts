import {Component, Input, OnInit} from '@angular/core';
import {Questionnaire} from '../questionnaire-body/questionnaire-body.component';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.scss']
})
export class QuestionnaireItemComponent implements OnInit {
  @Input() questionnaires: Questionnaire[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
