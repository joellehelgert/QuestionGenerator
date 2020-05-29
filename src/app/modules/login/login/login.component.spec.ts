import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Store} from "@ngxs/store";

const LoginData = {
  email: '123456@gmx.net',
  password: '123456'
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let store: Store;

  beforeEach(async(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authService = jasmine.createSpyObj('AuthService', ['login']);
    store = jasmine.createSpyObj('Store', ['error', 'dispatch']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{
        provide: AuthService,
        useValue: authService,
      },{
        provide: Store,
        useValue: store,
      },
      FormBuilder
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emailInput = fixture.nativeElement.querySelector('input#email');
    passwordInput = fixture.nativeElement.querySelector('input#password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(emailInput).not.toBeFalsy();
    expect(passwordInput).not.toBeFalsy();
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.error).toBeFalsy();
  });

  it('email not empty and valid test', (done) => {
    fixture.whenStable().then(() => {
      emailInput.value = '';
      emailInput.dispatchEvent(new Event('input'));
      component.loginForm.controls.email.markAsTouched();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.login--error')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('.login--error').textContent).toContain('This field must be filled!');

      emailInput.value = LoginData.email;
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = LoginData.password;
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.loginForm.valid).toBeTrue();
      expect(fixture.nativeElement.querySelector('.login--error')).toBeNull();
      expect(component.loginForm.value.email).toBe(LoginData.email);
      done();
    });
  });

  it('password not empty test', (done) => {
    fixture.whenStable().then(() => {
      passwordInput.value = '';
      component.loginForm.controls.password.markAsTouched();
      passwordInput.dispatchEvent(new Event('input'));
      emailInput.value = LoginData.email;
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      console.log(fixture.nativeElement);
      expect(component.loginForm.valid).toBeFalsy();
      expect(fixture.nativeElement.querySelector('.login--error')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.login--error').textContent).toContain('This field must be filled!');

      emailInput.value = LoginData.email;
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = LoginData.password;
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.loginForm.valid).toBeTrue();
      expect(fixture.nativeElement.querySelector('.login--error')).toBeNull();
      expect(component.loginForm.value.password).toBe('123456');

      done();
    });
  });

  it('test login call', (done) => {
    fixture.whenStable().then(() => {
      emailInput.value = LoginData.email;
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = LoginData.password;
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.loginForm.valid).toBeTrue();

      component.onSubmit();
      expect(component.submitted).toBeTruthy();
      expect(authService.login).toHaveBeenCalledWith(LoginData.email, LoginData.password);
      done();
    });
  });

});
