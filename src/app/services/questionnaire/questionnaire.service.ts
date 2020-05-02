import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';
import { Museum } from '../museum/museum.service';
import { Question, BuzzerQuestion, TimeLineQuestion, QuestionType } from '../question/question.service';

export interface Questionnaire extends Entity {
  id: number;
  title: string;
  museum: Museum; // maybe recheck how references in firebase are down
  buzzerQuestions: BuzzerQuestion[];
  timeLineQuestions: TimeLineQuestion[];
  isActive: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private crudService: FirestoreCrudService<Questionnaire>;

  constructor(private firestore: AngularFirestore) { // , @Inject('path') path: string) {
    this.crudService = new FirestoreCrudService<Questionnaire>(firestore, 'questionaires');
  }

  // Questions
  getAllQuestions() {
    return this.crudService.list();
  }

  getQuestion(questionnaire: Questionnaire, question) {
    // TODO now ownly returns the questionnaire
    return this.crudService.get(questionnaire.path);
  }

  addQuestion(questionnaire: Questionnaire, question: Question) {
    if (QuestionType.Buzzer) {
      questionnaire.buzzerQuestions.push(question as BuzzerQuestion);
    } else {
      questionnaire.timeLineQuestions.push(question);
    }

    return this.crudService.update(questionnaire);
  }

  removeQuestion(questionnaire: Questionnaire, question: Question) {
    if (question.type === QuestionType.Buzzer) {
      const questions = questionnaire.buzzerQuestions.map(item => {
        if (item.path !== question.path) {
          return question as BuzzerQuestion;
        }
      });

      return this.crudService.update({ ...questionnaire, buzzerQuestions: questions });
    }

    if (question.type === QuestionType.TimeLine) {
      const questions = questionnaire.timeLineQuestions.map(item => {
        if (item.path !== question.path) {
          return question;
        }
      });

      return this.crudService.update({ ...questionnaire, timeLineQuestions: questions });
    }
  }

  // Questionnaire
  removeQuestionnaire(questionnaire: Questionnaire) {
    return this.crudService.delete(questionnaire.path);
  }

  updateQuestionnaire(original: Questionnaire, updatedQuestion: Partial<Questionnaire>) {
    return this.crudService.update({ ...original, updatedQuestion } as Questionnaire); // TODO Typing?
  }

  addQuestionnaire(questionnaire: Questionnaire) {
    return this.crudService.add(questionnaire);
  }

  getQuestionnaire(path: string) {
    return this.crudService.get(path);
  }
}
