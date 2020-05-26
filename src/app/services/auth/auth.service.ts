import { Injectable } from '@angular/core';
import { Entity, FirestoreCrudService } from '../CRUD/crud.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Auth extends Entity {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private crudService: FirestoreCrudService<Auth>;
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.crudService = new FirestoreCrudService<Auth>(firestore, 'auth');
  }

  addUser(user: Auth) {
    return this.crudService.add(user);
  }



}
