import {Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, Subject } from 'rxjs';
import { Store } from "@ngxs/store";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData;
  private subject = new Subject<any>();
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {

  }

  login(email: string, password: string): Observable<{ token: string }> {
    this.auth.authState.subscribe(user => {
      if (user){
        this.userData = user;
        this.setUser(JSON.stringify(this.userData));
      } else {
        this.setUser(null);
      }
    });
    return of({
      token: this.getUser()
    });
  }

  logout(stateToken): Observable<null>{
    this.deleteUser(stateToken);
    return of(null);
  }

  setUser(JSONstring: string) {
    localStorage.setItem('user', JSONstring);
  }

  getUser(): string | null {
    return localStorage.getItem('user') || null;
  }

  deleteUser(stateToken) {
    localStorage.removeItem('user');
    localStorage.removeItem('stateToken');
  }
}
