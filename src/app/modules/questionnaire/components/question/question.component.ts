import { Component, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BuzzerAnswer, Question, QuestionType, TimeLineAnswer, QuestionService, FirebaseQuestionObject } from 'src/app/services/question/question.service';

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
                id: -1,
                title: 'Your BuzzerQuestion Answer here',
                image: null,
                isTrue: true
            };
            const answerFalse: BuzzerAnswer = {
                id: -1,
                title: 'Your BuzzerQuestion Answer here',
                image: null,
                isTrue: false
            };
            this.question = {
                id: -1,
                title: 'Is this a new question?',
                answers: [answerTrue, answerFalse, answerFalse, answerFalse],
                type: QuestionType.Buzzer,
            };
        } else if (this.type === 0) {
            const answer: TimeLineAnswer = {
                id: -1,
                title: 'Your TimeLineQuestion Answer here',
                image: null
            };
            this.question = {
                id: -1,
                title: 'Is this a new question?',
                answers: [answer, answer, answer, answer],
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
            // this.questions.push(question);
            question.id = 0; // @Todo set fitting ID
            // @Todo add in db
        } else {
            // @Todo update in db
            console.log(this.questions);
            this.questions.questions.map(q => {
                if (q.id === question.id) {
                    return question;
                }
                return q;
            });
            // this.questions.push(question);
            // this.questions[oldQuest.id] = question;
            this.questionService.updateQuestion(this.questions, QuestionType.Buzzer);
        }
        this.showQuestionView = false;
    }

    onCloseClicked() {
        this.showQuestionView = false;
    }
}
