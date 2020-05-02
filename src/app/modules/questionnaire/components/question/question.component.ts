import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Question } from 'src/app/services/question/question.service';

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
