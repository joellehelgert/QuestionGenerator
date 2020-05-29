import { Component, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SimpleErrorObject } from 'src/app/states/HintState';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit, OnChanges {
  errors$: Observable<SimpleErrorObject[]>;
  successes$: Observable<string[]>;

  constructor(private store: Store) {
    this.errors$ = this.store.select(state => state.status.errors);
    this.successes$ = this.store.select(state => state.status.successes);
   }

  ngOnInit(): void {}

  ngOnChanges() {}

}
