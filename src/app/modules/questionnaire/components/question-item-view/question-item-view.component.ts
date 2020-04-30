import { Component, OnInit } from '@angular/core';
import {faTimes, faAngleRight, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question-item-view',
  templateUrl: './question-item-view.component.html',
  styleUrls: ['./question-item-view.component.scss']
})
export class QuestionItemViewComponent implements OnInit {
    faTimes = faTimes;
    faAngleRight = faAngleRight;
    faEdit = faEdit;
    faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
