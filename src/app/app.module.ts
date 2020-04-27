import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {QuestionnairModule} from './modules/questionnair/questionnair.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionnairModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
