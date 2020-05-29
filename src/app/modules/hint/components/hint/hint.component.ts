import { Component, OnInit, OnChanges } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SimpleErrorObject, HintState } from 'src/app/states/HintState';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit {
  @Select(HintState.getErrors) errors$: Observable<SimpleErrorObject[]>;
  @Select(HintState.getSuccesses) successes$: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
