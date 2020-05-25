import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';
import { Question } from '../question/question.service';
import { map } from 'rxjs/operators';

export interface Questionnaire extends Entity {
  id: number;
  title: string;
  museumId: string;
  questions: {
    path: string;
    questions: Question[];
  };
  questionReferences: Reference[];
  isActive: boolean;
}

interface Reference {
  id: string;
  parent?: {
    path?: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private crudService: FirestoreCrudService<Questionnaire>;

  constructor(private firestore: AngularFirestore) {
    this.crudService = new FirestoreCrudService<Questionnaire>(firestore, 'questionaires');
  }

  // Questionnaire
  removeQuestionnaire(questionnaire: Questionnaire) {
    return this.crudService.delete(questionnaire.path);
  }

  updateQuestionnaire(original: Questionnaire, updatedQuestion: Partial<Questionnaire>) {
    return this.crudService.update({ ...original, updatedQuestion } as Questionnaire);
  }

  addQuestionnaire(questionnaire: Questionnaire) {
    return this.crudService.add(questionnaire);
  }

  getQuestionnaire(path: string) {
    return this.firestore
      .collection('questionaires')
      .doc<Questionnaire>(path)
      .snapshotChanges()
      .pipe(
        // We want to map the document into a Typed JS Object
        map(doc => {
          // Only if the entity exists should we build an object out of it
          if (doc.payload.exists) {
            const data = doc.payload.data() as Questionnaire;
            const payloadId = doc.payload.id;
            return { path: payloadId, ...data };
          }
        })
      );
  }


  getAllQuestionnaires() {
    return this.crudService.list();
  }
}
