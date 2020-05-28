import { Component, OnInit, OnChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HintState, SimpleErrorObject } from 'src/app/states/HintState';

export enum HintType {
  info,
  error,
  success,
}

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit, OnChanges {
  visible = true;
  private delay = 3000;
  errors$: Observable<SimpleErrorObject[]>;
  successes$: Observable<string[]>;
  piecesOfInformation$: Observable<string[]>;

  constructor(private store: Store) {
    this.errors$ = this.store.select(state => state.status.errors);
    this.successes$ = this.store.select(state => state.status.successes);
    this.piecesOfInformation$ = this.store.select(state => state.status.piecesOfInformation);
   }

  ngOnInit(): void {}

  ngOnChanges() {
    this.show();
  }

  setDelay(delayInMS: number): void {
    this.delay = delayInMS;
  }

  show() {
    this.visible = true;
    setTimeout(() => this.setVisibility(false), this.delay);
  }

  setVisibility(visibile: boolean) {
    this.visible = visibile;
  }

  // getDefaultText() {
  //   switch (this.type) {
  //     case HintType.error:
  //       return 'Sorry, an error occured. Please try again. 🚫';
  //     case HintType.info:
  //       return 'Look here to find more informations 🤓';
  //     case HintType.success:
  //       return 'Your last interaction was successfully! 🎉';
  //     default:
  //       return 'Here are some more Infromations';
  //   }
  // }

  // getTypeClass() {
  //   switch (this.type) {
  //     case HintType.error:
  //       return 'hint hint--error';
  //     case HintType.info:
  //       return 'hint hint--info';
  //     case HintType.success:
  //       return 'hint hint--success';
  //     default:
  //       return 'hint hint--info';
  //   }
  // }
}
