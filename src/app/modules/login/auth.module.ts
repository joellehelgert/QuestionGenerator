import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from '../../services/auth/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './logout/logout.component';
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "../../states/AuthState";
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
  ],
  providers: [AuthService]
})

export class AuthModule {
}
