import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BuzzerAnswer, Question, QuestionType, TimeLineAnswer, QuestionService, FirebaseQuestionObject } from 'src/app/services/question/question.service';
import {Questionnaire} from "../../../../services/questionnaire/questionnaire.service";

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


    constructor(private questionService: QuestionService) {

    }

    ngOnInit(): void {
        if (this.type === 0) {
            this.questionType = 'TimeLineQuestions';
        } else if (this.type === 1) {
            this.questionType = 'BuzzerQuestions';
        }
    }

    addQuestion() {
        this.showQuestionView = true;

        if (this.type === 1) {
            const answerTrue: BuzzerAnswer = {
                id: 0,
                title: 'Your BuzzerQuestion Answer here',
                image: null,
                isTrue: true
            };
            const answerFalse: BuzzerAnswer = {
                id: 1,
                title: 'Your BuzzerQuestion Answer here',
                image: null,
                isTrue: false
            };
            const answerFalse2: BuzzerAnswer = {
                id: 2,
                title: 'Your BuzzerQuestion Answer here',
                image: null,
                isTrue: false
            };
            const answerFalse3: BuzzerAnswer = {
                id: 3,
                title: 'Your BuzzerQuestion Answer here',
                image: null,
                isTrue: false
            };
            this.question = {
                id: -1,
                title: 'Is this a new Buzzer question?',
                answers: [answerTrue, answerFalse, answerFalse2, answerFalse3],
                type: QuestionType.Buzzer,
            };
        } else if (this.type === 0) {
            const answer: TimeLineAnswer = {
                id: 0,
                title: 'Your TimeLineQuestion Answer here',
                image: null
            };
            const answer2: TimeLineAnswer = {
                id: 1,
                title: 'Your TimeLineQuestion Answer here',
                image: null
            };
            const answer3: TimeLineAnswer = {
                id: 2,
                title: 'Your TimeLineQuestion Answer here',
                image: null
            };
            const answer4: TimeLineAnswer = {
                id: 3,
                title: 'Your TimeLineQuestion Answer here',
                image: null
            };
            this.question = {
                id: -1,
                title: 'Is this a new TimeLine question?',
                answers: [answer, answer2, answer3, answer4],
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
        if ( id > -1 ) {
            this.questions.questions.splice(id, 1);
        }
        this.questionService.updateQuestion(this.questions, question.type);

        this.showQuestionView = false;
    }

    onCloseClicked() {
        this.showQuestionView = false;
    }
}
