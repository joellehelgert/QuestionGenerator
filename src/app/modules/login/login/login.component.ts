import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AddError } from '../../../states/HintState';
import { Store } from '@ngxs/store';

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
    private router: Router,
    private authService: AuthService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.store.dispatch(new AddError({statusCode: 500, message: '❌ Please enter a valid email address.'}));
      throw new Error("Some error occured");
    }

    if (this.loginForm.valid) {
      this.authService.login(email, password);
    }
  }
}
