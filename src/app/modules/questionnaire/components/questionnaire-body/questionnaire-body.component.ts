import { Component, OnInit } from '@angular/core';
import { BuzzerAnswer, TimeLineAnswer, QuestionService, FirebaseQuestionObject } from '../../../../services/question/question.service';
import { Questionnaire, QuestionnaireService } from '../../../../services/questionnaire/questionnaire.service';
import { of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Reference } from '@angular/fire/firestore/angular-fire-firestore';

// buzzerQuestion
const buzzerAnswer1: BuzzerAnswer = {
    id: 1,
    title: 'Number one',
    isTrue: false,
    image: null,
};
const buzzerAnswer2: BuzzerAnswer = {
    id: 2,
    title: 'Number two',
    isTrue: false,
    image: null,
};
const buzzerAnswer3: BuzzerAnswer = {
    id: 3,
    title: 'Number three',
    isTrue: true,
    image: null,
};

// const buzzerQuestion1: Question = {
//     id: 1,
//     title: 'Whats the buzzer?',
//     answers: [buzzerAnswer1, buzzerAnswer2, buzzerAnswer3, buzzerAnswer1],
//     type: QuestionType.Buzzer
// };


// timelineQuestion
const timeLineAnswer1: TimeLineAnswer = {
    id: 1,
    title: 'Number one',
    image: null,
};
const timeLineAnswer2: TimeLineAnswer = {
    id: 2,
    title: 'Number two',
    image: null,
};
const timeLineAnswer3: TimeLineAnswer = {
    id: 3,
    title: 'Number three',
    image: null,
};

// const timeLineQuestion1: Question = {
//     id: 1,
//     title: 'Whats the Time Line?',
//     answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3, timeLineAnswer3],
//     type: QuestionType.TimeLine
// };

// const timeLineQuestion2: Question = {
//     id: 2,
//     title: 'Hello Time Line?',
//     answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3, timeLineAnswer3],
//     type: QuestionType.TimeLine
// };

// const timeLineQuestion3: Question = {
//     id: 3,
//     title: 'Whoop whoop',
//     answers: [timeLineAnswer1, timeLineAnswer2, timeLineAnswer3, timeLineAnswer3],
//     type: QuestionType.TimeLine
// };

// questionnaire
// const questionnaire1: Questionnaire = {
//     id: 1,
//     title: 'Questionnaire Test 1',
//     museumId: 'test-museum',
//     questions: [buzzerQuestion1,
//         buzzerQuestion1, buzzerQuestion1,
//         buzzerQuestion1, timeLineQuestion1, timeLineQuestion2, timeLineQuestion3],
//     isActive: true
// };


@Component({
    selector: 'app-questionnaire-body',
    templateUrl: './questionnaire-body.component.html',
    styleUrls: ['./questionnaire-body.component.scss']
})
export class QuestionnaireBodyComponent implements OnInit {
    questionnaires: Questionnaire[] | any[];
    questionnaire: Questionnaire | any;
    loadingOverview = true;
    loadingQuestions = true;
    error = null;
    activeQuestionnaire = 'testQuestionaire';

    constructor(private questionnaireService: QuestionnaireService, private questionService: QuestionService) {
    }

    ngOnInit(): void {
        this.loadQuestionnaires();
        this.loadQuestionnaire();

        console.log('body', this.questionnaire);

    }

    setActiveQuestionnaire(path: string) {
        this.activeQuestionnaire = path;
        this.loadQuestionnaire();
    }

    loadQuestionnaire() {
        this.questionnaireService.getQuestionnaire(this.activeQuestionnaire).pipe(
            tap(() => {
                this.error = null;
                this.loadingQuestions = true;
            }),
            switchMap((search) => {
                if (search) {
                    const result = this.questionnaireService.getQuestionnaire(this.activeQuestionnaire).pipe(
                        catchError(error => {
                            console.error('error', error);
                            this.error = error;
                            return of({} as Questionnaire);
                        })
                    );
                    return result;
                }

                return of({} as Questionnaire); // creates an empty observable
            }),
        ).subscribe((questionnaire) => {
            this.questionnaire = questionnaire;
            console.log('questionnaire', questionnaire);
            if (questionnaire.questions as Reference<any>[]) {
                questionnaire.questions.forEach(location => {
                    this.questionService.getAllQuestions(location.id, location.parent.path).pipe(
                        switchMap((question) => {
                            console.log('question in second switch map ', question);
                            if (question) {
                                console.log('question that is returned', question);
                                return [question];
                            }
                            return of({} as FirebaseQuestionObject); // creates an empty observable
                        })
                    ).subscribe((data: FirebaseQuestionObject) => {
                        this.loadingQuestions = false;
                        if (!this.questionnaire.questions || this.questionnaire.questions.length <= 0) {
                            this.questionnaire.questions = [data.questions];
                        } else {
                            this.questionnaire.questions.push(data.questions);
                        }

                        console.log('after adding', this.questionnaire);
                    });
                });
            }
        });
    }

    loadQuestionnaires() {
        this.questionnaireService.getAllQuestionnaires().pipe(
            tap(() => {
                this.error = null;
                this.loadingOverview = true;
                this.loadingQuestions = true;
            }),
            switchMap((search) => {
                if (search) {
                    return this.questionnaireService.getAllQuestionnaires().pipe(catchError(error => {
                        console.error('error', error);
                        this.error = error;
                        return of([]);
                    }));
                }

                return of([] as Questionnaire[]); // creates an empty observable
            }),
        ).subscribe((questionnaires) => {
            this.loadingOverview = false;
            this.questionnaires = questionnaires;
            console.log('sub', this.questionnaires);
        });
    }
}
