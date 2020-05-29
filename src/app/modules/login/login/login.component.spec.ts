import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import { of } from 'rxjs';
import {RouterTestingModule} from "@angular/router/testing";

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

  beforeEach(async(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authService = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{
        provide: AuthService,
        useValue: authService,
      }, {
        provide: Router,
        useValue: router,
      }],
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

  it('input should exist', () => {
    expect(emailInput).not.toBeFalsy();
    expect(passwordInput).not.toBeFalsy();
  });

  it('email not empty and valid test', (done) => {
    fixture.whenStable().then(() => {
      passwordInput.value = 'ignored';
      emailInput.value = 'hallo@gmx.net';
      emailInput.dispatchEvent(new Event('input'));
      expect(fixture.nativeElement.querySelector('.login--error')).toBeNull();
      expect(component.loginForm.value.email).toBe('hallo@gmx.net');

      emailInput.value = '';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.login--error')).not.toBeNull();
      expect(component.loginForm.value.email).toBe('', 'email should be set to empty string');

      emailInput.value = 'hallo';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.login--error')).not.toBeNull();
      expect(component.loginForm.value.email).toBe('hallo', 'not a valid email');
      done();
    });
  });

  it('password not empty test', (done) => {
    fixture.whenStable().then(() => {
      emailInput.value = 'ignored';
      passwordInput.value = '123456';
      passwordInput.dispatchEvent(new Event('input'));
      expect(fixture.nativeElement.querySelector('.login--error')).toBeNull();
      expect(component.loginForm.value.password).toBe('123456');

      passwordInput.value = '';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.login--error')).not.toBeNull();
      expect(component.loginForm.value.password).toBe('', 'password should be set to empty string');

      passwordInput.value = '12';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.login--error')).not.toBeNull();
      expect(component.loginForm.value.password).toBe('12', 'password length is too short');
      done();
    });
  });

});
