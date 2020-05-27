import {Injectable, NgZone} from '@angular/core';
import { Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


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
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
          } else {
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
          }
        });

        this.ngZone.run(() => {
          console.log('worked');
          this.router.navigate(['/questionnaire']);
        });
      }).catch((error) => {
      localStorage.setItem('user', null);
      window.alert(error.message);
    });
  }
  isLoggedIn() {
    /*return localStorage.getItem('user') != null;
    return localStorage.getItem('user') || null;*/
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return (user !== null && user.emailVerified !== false);
  }

  logout() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
