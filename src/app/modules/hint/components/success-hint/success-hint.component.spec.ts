import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessHintComponent } from './success-hint.component';

describe('SuccessHintComponent', () => {
  let component: SuccessHintComponent;
  let fixture: ComponentFixture<SuccessHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
