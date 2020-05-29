import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BuzzerAnswer, Question, QuestionType, TimeLineAnswer, QuestionService, FirebaseQuestionObject } from '../../../../services/question/question.service';

interface Error {
    isTrue: boolean;
    message: string;
}

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
    noTitleError: Error = {
        isTrue: false,
        message: 'Please insert a question title.',
    };
    noAnswerError: Error = {
        isTrue: false,
        message: 'Please insert a value for every answer.',
    };
    noIsTrueError: Error = {
        isTrue: false,
        message: 'Please mark one answer as true (only one).',
    };
    errors: Error[] = [this.noTitleError, this.noAnswerError, this.noIsTrueError];

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

    constructor(private questionService: QuestionService) {}

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

    hasErrors(question: Question): boolean {
        let countIsTrue = 0;
        let returnValue = false;
        // check if the question has a title
        if (question.title === '') {
            this.noTitleError.isTrue = true;
            returnValue = true;
        }
        // check if each answer has a title
        question.answers.forEach((answer) => {
            if (answer.title === '') {
                this.noAnswerError.isTrue = true;
                returnValue = true;
            }
        });
        // check if at least one answer is true
        if (question.type === QuestionType.Buzzer) {
            question.answers.forEach((answer) => {
                if ((answer as BuzzerAnswer).isTrue === true) {
                    countIsTrue++;
                }
            });
            if (countIsTrue !== 1) {
                this.noIsTrueError.isTrue = true;
                returnValue = true;
            }
        }
        return returnValue;
    }

    onSaveQuestion(question: Question) {
        this.errors.forEach((error) => {
            error.isTrue = false;
        });

        if (!this.hasErrors(question)) {
            if (question.id < 0) {
                const length = this.questions.questions.length;
                if (length < 1) {
                    question.id = 0;
                } else {
                    question.id = this.questions.questions[length - 1].id + 1;
                }
                this.questions.questions.push(question);
                this.questionService.updateQuestion(this.questions, question.type)
                    .then(() => {
                        this.loadQuestionnaire.emit();
                    })
                    .catch((error) => {
                        console.error('error during updating question', error);
                    });
            } else {
                this.questions.questions.map(q => {
                    if (q.id === question.id) {
                        return question;
                    }
                    return q;
                });
                this.questionService.updateQuestion(this.questions, question.type)
                    .then(() => {
                        this.loadQuestionnaire.emit();
                    })
                    .catch((error) => {
                        console.error('error during updating question', error);
                    });
            }
            this.showQuestionView = false;
        }
    }

    onRemoveQuestion(question: Question) {
        const id = this.questions.questions.indexOf(question);
        if (id > -1) {
            this.questions.questions.splice(id, 1);
        }
        this.questionService.updateQuestion(this.questions, question.type);

        this.showQuestionView = false;
        this.loadQuestionnaire.emit();
    }

    onCloseClicked() {
        this.showQuestionView = false;
    }
}
