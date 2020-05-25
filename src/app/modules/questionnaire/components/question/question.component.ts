import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BuzzerAnswer, Question, QuestionType, TimeLineAnswer, QuestionService, FirebaseQuestionObject } from '../../../../services/question/question.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
    faPlus = faPlus;
    showQuestionView = false;
    question: Question;
    questionType: string;

    @Input() questionnaireTitle = '';
    @Input() questions: FirebaseQuestionObject;
    @Input() type: QuestionType;

    @Output() loadQuestionnaire = new EventEmitter();

    defaultBuzzerAnswer: BuzzerAnswer = {
        id: 0,
        title: '',
        isTrue: false
    };
    defaultTimeLineAnswer: TimeLineAnswer = {
        id: 0,
        title: '',
    };


    constructor(private questionService: QuestionService) {

    }

    ngOnInit(): void {
        if (this.type === QuestionType.TimeLine) {
            this.questionType = 'TimeLineQuestions';
        } else if (this.type === QuestionType.Buzzer) {
            this.questionType = 'BuzzerQuestions';
        }
    }

    addQuestion() {
        this.showQuestionView = true;

        if (this.type === QuestionType.Buzzer) {
            this.question = {
                id: -1,
                title: '',
                answers: [
                    { ...this.defaultBuzzerAnswer, isTrue: true },
                    { ...this.defaultBuzzerAnswer, id: 1 },
                    { ...this.defaultBuzzerAnswer, id: 2 },
                    { ...this.defaultBuzzerAnswer, id: 3 }
                ],
                type: QuestionType.Buzzer,
            };
        } else if (this.type === QuestionType.TimeLine) {
            this.question = {
                id: -1,
                title: '',
                answers: [
                    { ...this.defaultTimeLineAnswer },
                    { ...this.defaultTimeLineAnswer, id: 1 },
                    { ...this.defaultTimeLineAnswer, id: 2 },
                    { ...this.defaultTimeLineAnswer, id: 3 }
                ],
                type: QuestionType.TimeLine,
            };
        }
    }

    updateQuestion(question: Question) {
        this.showQuestionView = true;
        this.question = question;
    }

    onSaveQuestion(question: Question) {
        if (question.id < 0) {
            const length = this.questions.questions.length;
            if (length < 1) {
                question.id = 0;
            } else {
                question.id = this.questions.questions[length - 1].id + 1;
            }
            this.questions.questions.push(question);
            this.questionService.updateQuestion(this.questions, question.type);
        } else {
            this.questions.questions.map(q => {
                if (q.id === question.id) {
                    return question;
                }
                return q;
            });
            this.questionService.updateQuestion(this.questions, question.type);
        }
        this.showQuestionView = false;
        this.loadQuestionnaire.emit();
    }

    onRemoveQuestion(question: Question) {
        const id = this.questions.questions.indexOf(question);
        if (id > -1) {
            this.questions.questions.splice(id, 1);
        }
        this.questionService.updateQuestion(this.questions, question.type);

        this.showQuestionView = false;
    }

    onCloseClicked() {
        this.showQuestionView = false;
    }
}
