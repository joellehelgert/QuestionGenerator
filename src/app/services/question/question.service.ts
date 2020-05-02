import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';

export enum QuestionType {
  TimeLine,
  Buzzer,
}

export interface Answer {
  id: number;
  title: string;
}

export interface Question extends Entity {
  id: number;
  title: string;
  answers: Answer[];
  type: QuestionType;
}

export interface BuzzerAnswer extends Answer {
  isTrue: boolean;
}

export interface BuzzerQuestion extends Question {
  answers: BuzzerAnswer[];
}

export interface TimeLineAnswer extends Answer {
  image?: ImageData;
}

export interface TimeLineQuestion extends Question {
  answers: TimeLineAnswer[];
}


@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private crudService: FirestoreCrudService<Question>;

  constructor(private firestore: AngularFirestore) { // @Inject('path') path: string) {
    this.crudService = new FirestoreCrudService<Question>(firestore, '');
  }

  getAllAnswers() {
    return this.crudService.list();
  }

  getAnswer(question: Question) {
    return this.crudService.get(question.path);
  }

  addAnswer(question: Question, answer: Answer, path?: string) {
    question.answers.push(answer);
    return this.crudService.add(question, path);
  }

  removeAnswer(question: Question, answer: Answer) {
    const answers = question.answers.map(item => {
      if (answer.id !== item.id) {
        return item;
      }
    });

    return this.crudService.update({ ...question, answers });
  }

  updateAnswer(original: Question, updatedQuestion: Partial<Question>) {
    return this.crudService.update({ ...original, updatedQuestion } as Question); // TODO Typing?
  }
}
