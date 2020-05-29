import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnaireBodyComponent} from './components/questionnaire-body/questionnaire-body.component';
import {LoggedInGuard} from '../login/guard/logged-in.guard';

const routes: Routes = [{
  path: '',
  canActivate: [LoggedInGuard],
  component: QuestionnaireBodyComponent,
}];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class QuestionnaireRoutingModule { }
