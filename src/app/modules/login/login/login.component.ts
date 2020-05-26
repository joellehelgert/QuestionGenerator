import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm, FormControl} from '@angular/forms';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  /*Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')*/
  get form() { return this.loginForm.controls; }
  onSubmit(formData) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.warn(this.loginForm.value);

    if (formData.valid) {
      this.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          this.router.navigate(['/questionnaire']);
        }).catch(
        (err) => {
          console.log('Error Login');
        });
    }
  }
}
