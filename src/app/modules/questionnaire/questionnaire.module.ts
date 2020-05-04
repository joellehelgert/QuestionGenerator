import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionnaireItemComponent } from './components/questionnaire-item/questionnaire-item.component';
import { QuestionnaireBodyComponent } from './components/questionnaire-body/questionnaire-body.component';
import { QuestionnaireNavComponent } from './components/questionnaire-nav/questionnaire-nav.component';
import { QuestionItemViewComponent } from './components/question-item-view/question-item-view.component';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';



@NgModule({
  declarations: [
    QuestionComponent,
    QuestionnaireItemComponent,
    QuestionnaireBodyComponent,
    QuestionnaireNavComponent,
    QuestionItemViewComponent],
  exports: [QuestionComponent, QuestionnaireItemComponent, QuestionnaireBodyComponent, QuestionnaireNavComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  providers: [QuestionnaireService]
})
export class QuestionnaireModule { }
