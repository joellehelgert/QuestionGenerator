import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionnaireItemComponent } from './components/questionnaire-item/questionnaire-item.component';
import { QuestionnaireBodyComponent } from './components/questionnaire-body/questionnaire-body.component';
import { QuestionnaireNavComponent } from './components/questionnaire-nav/questionnaire-nav.component';
import { QuestionItemViewComponent } from './components/question-item-view/question-item-view.component';
import { QuestionnaireService } from '../../services/questionnaire/questionnaire.service';
import { LoadingComponent } from '../loading/loading/loading.component';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';



@NgModule({
  declarations: [
    LoadingComponent,
    QuestionComponent,
    QuestionnaireItemComponent,
    QuestionnaireBodyComponent,
    QuestionnaireNavComponent,
    QuestionItemViewComponent],
  exports: [QuestionComponent, QuestionnaireItemComponent, QuestionnaireBodyComponent, QuestionnaireNavComponent, LoadingComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    QuestionnaireRoutingModule,
  ],
  providers: [QuestionnaireService]
})
export class QuestionnaireModule { }
