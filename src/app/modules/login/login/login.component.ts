import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {AddError} from "../../../states/HintState";
import {Store} from "@ngxs/store";
import {Login} from "../../../states/AuthState";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: Error = null;
  readonly type = '[Auth] Login';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['123456@gmx.net', [Validators.email, Validators.required]],
      password: ['123456', [Validators.required]]
    });
  }
  onSubmit() {
    const { email, password } = this.loginForm.value;
    console.log(email.toString());
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      this.store.dispatch(new Login({
        email: email.toString(),
        password: password.toString(),
      }));
      // this.authService.login(this.payload);
    }
  }
}
