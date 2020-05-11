import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';
import { Questionnaire } from '../questionnaire/questionnaire.service';

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
  image: ImageData;
  isTrue: boolean;
}

export interface TimeLineAnswer extends Answer {
  image: ImageData;
}

/**
 * In Firebase the questions are not saved directly in the questionnaire objects
 * since they are not needed for the overview and therefore would be loaded even though they are not needed.
 * The FirebaseQuestionObject than represents the Questions object wich can be loaded later and be stored
 * in the questionnaire. The questionnaire allows both types for the questions property.
 */
export interface FirebaseQuestionObject {
  path: string;
  questions: Question[];
}



@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private crudService: FirestoreCrudService<FirebaseQuestionObject>;

  constructor(private firestore: AngularFirestore) { // @Inject('path') path: string) {
    this.crudService = new FirestoreCrudService<FirebaseQuestionObject>(firestore, 'buzzerQuestions');
  }

  getAllQuestions(path: string, parentPath?: string) {
    this.firestore.collection(parentPath);
    return this.crudService.get(path);
  }

  getQuestion(path) {
    return this.crudService.get(path);
  }

  updateQuestion(questions: FirebaseQuestionObject, type: QuestionType) {
    this.setCorrespondingBasePath(type);
    return this.crudService.update(questions);
  }

  removeQuestion(question: Question) {
    this.setCorrespondingBasePath(question.type);
    // if (question.type === QuestionType.Buzzer) {
    //   const questions = questionnaire.buzzerQuestions.map(item => {
    //     if (item.path !== question.path) {
    //       return question as BuzzerQuestion;
    //     }
    //   });

    //   return this.crudService.update({ ...questionnaire, buzzerQuestions: questions });
    // }

    // if (question.type === QuestionType.TimeLine) {
    //   const questions = questionnaire.timeLineQuestions.map(item => {
    //     if (item.path !== question.path) {
    //       return question;
    //     }
    //   });

    //   return this.crudService.update({ ...questionnaire, timeLineQuestions: questions });
    // }
  }

  setCorrespondingBasePath(type: QuestionType) {
    const basepath = type === QuestionType.TimeLine ? 'timeLineQuestions' : 'buzzerQuestions';
    this.firestore.collection(basepath);
  }
}
