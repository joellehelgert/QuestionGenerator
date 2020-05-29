import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, FormControl} from '@angular/forms';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {catchError, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: Error = null;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['123456@gmx.net', [Validators.email, Validators.required]],
      password: ['123456', [Validators.required]]
    });
  }
  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      console.log('login');
      this.authService.login(email, password);
      /*this.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          this.router.navigate(['/questionnaire']);
        }).catch(
        (err) => {
          console.log('Error Login');
        });*/
    }
  }
}
