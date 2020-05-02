import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';

export interface Answer {
  text: string;
  order: number;
  id: number;
}

export interface Question extends Entity {
  question: string;
  answers: Answer[];
}

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private crudService: FirestoreCrudService<Question>;

  constructor(private firestore: AngularFirestore, path: string) {
    this.crudService = new FirestoreCrudService<Question>(firestore, path);
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
