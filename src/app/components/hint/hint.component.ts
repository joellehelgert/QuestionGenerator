import { Component, OnInit, Input, OnChanges } from '@angular/core';

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
  visible = false;
  private delay = 3000;
  @Input() statusCode?: number;
  @Input() type: HintType;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
    this.show();
  }

  ngOnChanges() {
    this.show();
  }

  setDelay(delayInMS: number): void {
    this.delay = delayInMS;
  }

  show() {
    if (!this.text || this.text === '') {
      this.text = this.getDefaultText();
    }

    this.visible = true;
    setTimeout(() => this.setVisibility(false), this.delay);
  }

  setVisibility(visibile: boolean) {
    this.visible = visibile;
  }

  getDefaultText() {
    switch (this.type) {
      case HintType.error:
        return 'Sorry, an error occured. Please try again. 🚫';
      case HintType.info:
        return 'Look here to find more informations 🤓';
      case HintType.success:
        return 'Your last interaction was successfully! 🎉';
      default:
        return 'Here are some more Infromations';
    }
  }

  getTypeClass() {
    switch (this.type) {
      case HintType.error:
        return 'hint hint--error';
      case HintType.info:
        return 'hint hint--info';
      case HintType.success:
        return 'hint hint--success';
      default:
        return 'hint hint--info';
    }
  }
}
