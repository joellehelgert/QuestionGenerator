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
  id: string;
  parent?: {
    path?: string;
  };
  path: string;
  questions: Question[];
}



@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private crudService: FirestoreCrudService<Question>;

  constructor(private firestore: AngularFirestore) { // @Inject('path') path: string) {
    this.crudService = new FirestoreCrudService<Question>(firestore, 'buzzerQuestions');
  }

  getAllQuestions(path: string, parentPath?: string) {
    console.log('parentpaht', parentPath);
    this.firestore.collection(parentPath);
    return this.crudService.get(path);
  }

  getQuestion(path) {
    return this.crudService.get(path);
  }

  addQuestion(questionnaire: Questionnaire, question: Question) {
    this.setCorrespondingBasePath(question.type);
    return this.crudService.add(question);
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

  setCorrespondingBasePath(type: QuestionType) {
    const basepath = type === QuestionType.TimeLine ? 'timeLineQuestions' : 'buzzerQuestions';
    this.firestore.collection(basepath);
  }
}
