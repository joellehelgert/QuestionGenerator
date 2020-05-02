import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';
import { Museum } from '../museum/museum.service';
import { Question } from '../question/question.service';

export interface Questionaire extends Entity {
  name: string;
  museum: Museum; // maybe recheck how references in firebase are down
  questions: Question[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private crudService: FirestoreCrudService<Questionaire>;

  constructor(private firestore: AngularFirestore, path: string) {
    this.crudService = new FirestoreCrudService<Questionaire>(firestore, path);
  }

  // Questions
  getAllQuestions() {
    return this.crudService.list();
  }

  getQuestion(questionaire: Questionaire, question) {
    // TODO now ownly returns the questionaire
    return this.crudService.get(questionaire.path);
  }

  addQuestion(questionaire: Questionaire, question: Question) {
    questionaire.questions.push(question);
    return this.crudService.update(questionaire);
  }

  removeQuestion(questionaire: Questionaire, question: Question) {
    const questions = questionaire.questions.map(item => {
      if (item.path !== question.path) {
        return question;
      }
    });
    return this.crudService.update({ ...questionaire, questions });
  }

  // Questionaire
  removeQuestionaire(questionaire: Questionaire) {
    return this.crudService.delete(questionaire.path);
  }

  updateQuestionaire(original: Questionaire, updatedQuestion: Partial<Questionaire>) {
    return this.crudService.update({ ...original, updatedQuestion } as Questionaire); // TODO Typing?
  }

  addQuestionaire(questionaire: Questionaire) {
    return this.crudService.add(questionaire);
  }

  getQuestionaire(path: string) {
    return this.crudService.get(path);
  }
}
