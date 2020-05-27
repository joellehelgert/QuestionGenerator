import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FirestoreCrudService } from './crud.service';
import { FirebaseQuestionObject, QuestionType } from '../question/question.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

const question = {
  path: 'question1',
  id: 55,
  title: 'Which is the best star wars character?',
  answers: [
    { id: 1, title: 'Darth Vader', isTrue: false },
    { id: 2, title: 'Princess Lea', isTrue: false },
    { id: 3, title: 'Sith Lord', isTrue: false },
    { id: 4, title: 'Chewbacca', isTrue: true }
  ],
  type: QuestionType.Buzzer
};

const fireBaseQuestionObjectResult = {
  path: 'testpath',
  questions: [question]
};

// is used if a document is requested
const fireBaseQuestionObject = {
  payload: {
    data: () => ({
      path: 'testpath',
      questions: [question]
    }),
    exists: true,
  }
};

// is used if a collection is requested
const fireBaseQuestionsObject = {
  payload: {
    doc: {
      data: () => ({
        path: 'testpath',
        questions: [question]
      }),
      exists: true,
      id: 'testpath'
    }
  }
};


const data = of(fireBaseQuestionObject);
const list = of([fireBaseQuestionsObject]);

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(list),
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
  doc: jasmine.createSpy().and.returnValue({
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
    set: jasmine.createSpy('set').and.returnValue(new Promise(() => question)),
    then: jasmine.createSpy('then').and.returnValue(question)
  }),
  add: jasmine.createSpy().and.returnValue({
    then: jasmine.createSpy('then').and.returnValue(question)
  })
};

const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

const testPath = 'StarWarsPath';

describe('Firestore CRUD Service', () => {
  let httpMock: HttpTestingController;
  let service: FirestoreCrudService<FirebaseQuestionObject>;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: angularFiresotreStub }
      ],
    });

    angularFirestore = TestBed.inject(AngularFirestore);
    httpMock = TestBed.inject(HttpTestingController);
    service = new FirestoreCrudService<FirebaseQuestionObject>(angularFirestore, 'testpath');
  });

  afterEach(() => {
    httpMock.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(angularFiresotreStub.collection).toHaveBeenCalledWith(fireBaseQuestionObjectResult.path);
  });

  it('get data', async () => {
    const result$ = service.get(fireBaseQuestionObjectResult.path);
    result$.subscribe((res) => {
      expect(res).toEqual(fireBaseQuestionObjectResult);
    });

  });

  it('change base path', () => {
    service.setFirestoreBasePath(testPath);
    expect(angularFiresotreStub.collection).toHaveBeenCalledWith(testPath);
  });

  describe('add data functionality', async () => {
    it('with path param', async () => {

      expect(service).toBeTruthy();
      const result$ = service.add(fireBaseQuestionObjectResult, testPath);

      result$.then((res) => {
        // those checks needs to be in the then block to have a consistent test result.
        expect(angularFiresotreStub.collection).toHaveBeenCalledWith(testPath);
        expect(angularFiresotreStub.collection).not.toHaveBeenCalledWith(fireBaseQuestionObjectResult.path);
        expect(res).toEqual(fireBaseQuestionObjectResult);
      });
    });

    it('without path param', async () => {

      expect(service).toBeTruthy();
      const result$ = service.add(fireBaseQuestionObjectResult);


      result$.then((res) => {
        // those checks needs to be in the then block to have a consistent test result.
        expect(angularFiresotreStub.collection).not.toHaveBeenCalledWith(testPath);
        expect(angularFiresotreStub.collection).toHaveBeenCalledWith(fireBaseQuestionObjectResult.path);
        expect(res).toEqual(fireBaseQuestionObjectResult);
      });
    });
  });


  it('get all elements of a collection', async () => {
    expect(service).toBeTruthy();
    const result$ = service.list();

    result$.subscribe(res => {
      expect(res).toEqual([fireBaseQuestionObjectResult]);
    });
  });

  it('update an element', async () => {
    expect(service).toBeTruthy();
    const result$ = service.update(fireBaseQuestionObjectResult);

    result$.then(res => {
      expect(res).toEqual(fireBaseQuestionObjectResult);
    });
  });


  it('delete an element', async () => {
    expect(service).toBeTruthy();
    const result$ = service.update(fireBaseQuestionObjectResult);

    result$.then(res => {
      expect(res).toBeUndefined();
    });
  });

});
