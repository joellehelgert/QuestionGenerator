import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairNavComponent } from './questionnair-nav.component';

describe('QuestionnairNavComponent', () => {
  let component: QuestionnairNavComponent;
  let fixture: ComponentFixture<QuestionnairNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnairNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
