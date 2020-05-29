import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AddError } from '../../../states/HintState';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
    }, {
      validators: (formGroup) => {
        const pw = formGroup.value.password;
        const pwRepeat = formGroup.value.passwordRepeat;

        if (pw && pwRepeat && pw !== pwRepeat) {
          return { passwordRepeat: true };
        }

        return null;
      }
    });
  }
  onSubmit(formData) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.store.dispatch(new AddError({statusCode: 500, message: '❌ Form cannot be submitted.'}));
      throw new Error('Some error occured');
    }

    if (formData.valid) {
      this.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          this.router.navigate(['/questionnaire']);
        });
    }

  }
}
