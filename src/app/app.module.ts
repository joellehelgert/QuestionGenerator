import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { HeaderModule } from './modules/header/header.module';
import { FooterModule } from './modules/footer/footer.module';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import {AuthModule} from './modules/login/auth.module';
import { HintState } from './states/HintState';
import { HintComponent } from './modules/hint/components/hint.component';
import { HintModule } from './modules/hint/hint.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    NgxsModule.forRoot([HintState], {}),
    HeaderModule,
    FooterModule,
    QuestionnaireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    HintModule
  ],
  providers: [],
  bootstrap: [AppComponent, HintComponent]
})
export class AppModule { }
