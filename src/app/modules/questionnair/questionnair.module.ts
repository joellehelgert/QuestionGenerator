import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';
import { QuestionItemComponent } from './components/question-item/question-item.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionnairItemComponent } from './components/questionnair-item/questionnair-item.component';
import { QuestionnairBodyComponent } from './components/questionnair-body/questionnair-body.component';
import { QuestionnairNavComponent } from './components/questionnair-nav/questionnair-nav.component';



@NgModule({
  declarations: [QuestionComponent, QuestionItemComponent, QuestionnairItemComponent, QuestionnairBodyComponent, QuestionnairNavComponent],
  exports: [QuestionComponent, QuestionItemComponent, QuestionnairItemComponent, QuestionnairBodyComponent, QuestionnairNavComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ]
})
export class QuestionnairModule { }
