import { Injectable } from '@angular/core';
import {Entity, FirestoreCrudService} from '../CRUD/crud.service';
import {AngularFirestore} from '@angular/fire/firestore';

export interface Auth extends Entity {
  id: number;
  username: string;
  email: string;
  password: string;
  passwordValidation: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private crudService: FirestoreCrudService<Auth>;
  constructor(private firestore: AngularFirestore) {
    this.crudService = new FirestoreCrudService<Auth>(firestore, 'auth');
  }

  addUser(user: Auth) {
    return this.crudService.add(user);
  }

}
