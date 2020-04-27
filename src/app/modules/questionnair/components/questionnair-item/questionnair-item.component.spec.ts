import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairItemComponent } from './questionnair-item.component';

describe('QuestionnairItemComponent', () => {
  let component: QuestionnairItemComponent;
  let fixture: ComponentFixture<QuestionnairItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnairItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
