import {Component, Input, OnInit} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Question} from '../questionnaire-body/questionnaire-body.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  faPlus = faPlus;

  @Input() questions: Question[] = [];
  @Input() type = '';

  constructor() { }

  ngOnInit(): void {
  }

}
