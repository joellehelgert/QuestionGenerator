import { Injectable } from '@angular/core';
import { AngularFirestore, Reference } from '@angular/fire/firestore';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';
import { Question, QuestionService } from '../question/question.service';
import { map } from 'rxjs/operators';

export interface Questionnaire extends Entity {
  id: number;
  title: string;
  museumId: string;
  questions: Question[] | Reference<any>[];
  isActive: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private crudService: FirestoreCrudService<Questionnaire>;
  private questionService: QuestionService;

  constructor(private firestore: AngularFirestore) { // , @Inject('path') path: string) {
    this.crudService = new FirestoreCrudService<Questionnaire>(firestore, 'questionaires');
    this.questionService = new QuestionService(firestore);
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
