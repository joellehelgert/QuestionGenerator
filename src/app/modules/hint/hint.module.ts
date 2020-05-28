import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintComponent } from './components/hint.component';
import { Store } from '@ngxs/store';



@NgModule({
  declarations: [HintComponent],
  imports: [
    CommonModule
  ],
  exports: [HintComponent],
  providers: [Store]
})
export class HintModule { }
