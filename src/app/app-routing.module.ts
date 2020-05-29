import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './modules/login/login/login.component';
import {LoggedInGuard} from './modules/login/guard/logged-in.guard';

const routes: Routes = [
  {
    path: 'questionnaire',
    canLoad: [LoggedInGuard],
    loadChildren: () => import('./modules/questionnaire/questionnaire.module').then(m => m.QuestionnaireModule),
  }, {
    path: '**',
    component: LoginComponent,
  }];

@NgModule(
  {
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
