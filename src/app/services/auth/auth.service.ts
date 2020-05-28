import {Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from "rxjs";


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
  ) {

  }
  /*
  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      this.auth.onAuthStateChanged( user => {
        if (user) {
          resolve(user);
          console.log(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }*/
  login(email: string, password: string) {
    console.log(this.auth.idToken);
    console.log(this.auth.idTokenResult);
    return this.auth.signInWithEmailAndPassword(email, password).then(
      (success) => {
        this.auth.authState.subscribe(user => {
          if (user){
            this.userData = user;
            this.setUser(JSON.stringify(this.userData));
            //this.auth.signInWithCustomToken();
            //this.auth.onAuthStateChanged()
            this.router.navigate(['/questionnaire']);
          } else {
            this.setUser(null);
          }
        });
      }).catch((error) => {
      this.setUser(null);
      return error;
      window.alert(error.message);
    });
  }
  isLoggedIn() {
    // console.log(this.getUser());
    if (this.getUser() !== null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    return this.auth.signOut().then(() => {
      this.deleteUser();
      this.router.navigate(['/login']);
    });
  }

  setUser(JSONstring: string) {
    localStorage.setItem('user', JSONstring);
  }

  getUser(): string | null {
    return localStorage.getItem('user') || null;
  }

  deleteUser() {
    localStorage.removeItem('user');
  }

  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }
}
