import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modules/login/login/login.component";


const routes: Routes = [
  {
    path: 'questionnaire',
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
