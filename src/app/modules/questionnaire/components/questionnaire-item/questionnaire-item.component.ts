import { Component, Input, OnInit } from '@angular/core';
import { Questionnaire } from 'src/app/services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.scss']
})
export class QuestionnaireItemComponent implements OnInit {
  @Input() questionnaire: Questionnaire;

  constructor() { }

  ngOnInit(): void {
    console.log('item', this.questionnaire);
  }

}
