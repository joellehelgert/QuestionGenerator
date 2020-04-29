import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


interface Answer {
    id: number;
    title: string;
}

interface Question {
    id: number;
    title: string;
}

export interface BuzzerAnswer extends Answer{
    isTrue?: boolean;
}

export interface BuzzerQuestion extends Question{
    answers: BuzzerAnswer[];
}

export interface TimeLineAnswer extends Answer{
    image?: ImageData;
}

export interface TimeLineQuestion extends Question{
    answers: TimeLineAnswer[];
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
