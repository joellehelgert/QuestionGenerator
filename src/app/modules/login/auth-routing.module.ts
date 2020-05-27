import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LoggedInGuard} from "./guard/logged-in.guard";
import {LoggedOutGuard} from "./guard/logged-out.guard";


const routes: Routes = [{
  path: 'login',
  canActivate: [LoggedOutGuard],
  component: LoginComponent,
}, {
  path: 'logout',
  canActivate: [LoggedInGuard],
  component: LoginComponent,
}, {
  path: 'register',
  canActivate: [LoggedOutGuard],
  component: RegisterComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
