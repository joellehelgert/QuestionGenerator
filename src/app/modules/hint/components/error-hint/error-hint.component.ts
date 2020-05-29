import { Component, OnInit, Input } from '@angular/core';
import { SimpleErrorObject, RemoveLastError } from 'src/app/states/HintState';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-error-hint',
  templateUrl: './error-hint.component.html',
  styleUrls: ['../hint/hint.component.scss']
})
export class ErrorHintComponent implements OnInit {
  @Input() error: SimpleErrorObject;
  visible = true;
  private delay = 3000;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.visible = true;
    this.show();
  }

  show() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
      this.store.dispatch(new RemoveLastError());
    }, this.delay);
  }

}
