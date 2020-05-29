import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHintComponent } from './components/error-hint/error-hint.component';
import { SuccessHintComponent } from './components/success-hint/success-hint.component';
import { HintComponent } from './components/hint/hint.component';

@NgModule({
  declarations: [HintComponent, ErrorHintComponent, SuccessHintComponent],
  imports: [
    CommonModule
  ],
  exports: [HintComponent]
})
export class HintModule { }
