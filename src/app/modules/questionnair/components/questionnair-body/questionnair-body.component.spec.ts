import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairBodyComponent } from './questionnair-body.component';

describe('QuestionnairBodyComponent', () => {
  let component: QuestionnairBodyComponent;
  let fixture: ComponentFixture<QuestionnairBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnairBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
