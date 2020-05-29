import { Component, OnInit, Input } from '@angular/core';
import { RemoveLastSuccess } from 'src/app/states/HintState';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-success-hint',
  templateUrl: './success-hint.component.html',
  styleUrls: ['../hint/hint.component.scss']
})
export class SuccessHintComponent implements OnInit {
  @Input() success: string;
  visible = true;
  private delay = 3000;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.visible = true;
    this.show();
  }

  show() {
    this.visible = true;
    setTimeout(() =>{
      this.visible = false;
      this.store.dispatch(new RemoveLastSuccess())
    }, this.delay);
  }

}
