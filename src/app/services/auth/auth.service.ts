import {Injectable, NgZone} from '@angular/core';
import { Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {switchMap, map, tap} from "rxjs/operators";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData;
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone,
  ) {

  }
  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (success) => {

        this.auth.authState.subscribe(user => {
          if (user){
            this.userData = user;
            this.setUser(JSON.stringify(this.userData));
            // JSON.parse(localStorage.getItem('user'));
          } else {
            // this.setUser(null);
            // JSON.parse(localStorage.getItem('user'));
          }
        });
        this.ngZone.run(() => {
          console.log('worked');
          this.router.navigate(['/questionnaire']);
        });
      }).catch((error) => {
      this.setUser(null); // localStorage.setItem('user', null);
      window.alert(error.message);
    });
  }
  isLoggedIn() {
    // const user = JSON.parse(localStorage.getItem('user'));
    console.log(this.getUser());
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
}
