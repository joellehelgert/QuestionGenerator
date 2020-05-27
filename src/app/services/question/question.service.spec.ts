import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FirestoreCrudService } from '../CRUD/crud.service';

const question = {
  path: 'testpath',
  id: 55,
  title: 'Which is the best star wars character?',
  answers: [
    { id: 1, title: 'Darth Vader', isTrue: false },
    { id: 2, title: 'Princess Lea', isTrue: false },
    { id: 3, title: 'Sith Lord', isTrue: false },
    { id: 4, title: 'Chewbacca', isTrue: true }
  ],
};

const data = of(question);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: FirestoreCrudService, useValue: angularFiresotreStub },
        { provide: AngularFirestore, useValue: angularFiresotreStub }
      ],
    });

    angularFirestore = TestBed.inject(AngularFirestore);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
