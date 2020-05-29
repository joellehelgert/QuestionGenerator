import { Component, OnInit } from '@angular/core';
import { QuestionService, FirebaseQuestionObject } from '../../../../services/question/question.service';
import { Questionnaire, QuestionnaireService } from '../../../../services/questionnaire/questionnaire.service';
import { of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AddSuccess, AddError } from 'src/app/states/HintState';



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
    activeQuestionnaireItem: Questionnaire;
    activeQuestionnaire = '';

    constructor(private questionnaireService: QuestionnaireService, private questionService: QuestionService, private store: Store) { }

    ngOnInit(): void {
        this.loadQuestionnaires();
    }

    setActiveQuestionnaire(activeQuestionnaireItem: Questionnaire) {
        this.activeQuestionnaireItem = activeQuestionnaireItem;
        this.activeQuestionnaire = this.activeQuestionnaireItem.path;
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
                            this.error = error;
                            return of({} as Questionnaire);
                        })
                    );
                    return result;
                }

                return of<Questionnaire>();
            }),
        ).subscribe((questionnaire) => {
            this.questionnaire = questionnaire;
            if (questionnaire.questionReferences) {
                questionnaire.questionReferences.forEach(location => {
                    this.questionService.getAllQuestions(location.id, location.parent.path).pipe(
                        switchMap((question) => {
                            if (question) {
                                return [question];
                            }
                            return of<FirebaseQuestionObject>();
                        })
                    ).subscribe((data: FirebaseQuestionObject) => {
                        this.loadingQuestions = false;
                        if (!this.questionnaire.questions || this.questionnaire.questions.length <= 0) {
                            this.questionnaire.questions = [data];
                        } else {
                            this.questionnaire.questions.push(data);
                        }
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
                        this.store.dispatch(new AddError({statusCode: 500, message: "We could not load the specific questionnaire, please try again later"}));
                        this.error = error;
                        return of([]);
                    }));
                }

                return of<Questionnaire[]>(); // creates an empty observable
            }),
        ).subscribe((questionnaires) => {
            if (questionnaires && questionnaires.length > 0) {
                this.store.dispatch(new AddSuccess('Data loading was successful! 🎉'));
                this.loadingOverview = false;
                this.questionnaires = questionnaires;
                this.questionnaires.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
                this.setActiveQuestionnaire(this.questionnaires[0]);
            } else {
                this.loadingOverview = false;
                this.loadingQuestions = false;
            }

        },
        (error) =>{
            this.loadingQuestions = false;
            this.loadingOverview = false;
            this.error = error;
        });
    }
}
