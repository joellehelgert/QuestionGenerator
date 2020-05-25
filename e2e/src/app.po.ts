import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root app-header .header__title')).getText() as Promise<string>;
  }

  getQuestionnaireTitleText(): Promise<string> {
      return element(by.css('app-questionnaire-nav .questionnaire__nav--mobile .questionnaire__item')).getText() as Promise<string>;
  }

  getQuestionTypeTitleText(): Promise<string> {
      return element(by.css('app-questionnaire-item .questionnaire__body .carousel-inner .carousel-item.active .question__heading'))
          .getText() as Promise<string>;
  }

  getLastQuestionTitle(): Promise<string> {
      return element(by.css('app-questionnaire-item .questionnaire__body .carousel-item.active .question__body .question__item__wrapper:last-of-type .question__item'))
          .getText() as Promise<string>;
  }


  navigateTroughQuestionnaires() {
      element(by.css('app-questionnaire-nav .questionnaire__nav--mobile .questionnaire__item')).click();
      element(by.css('app-questionnaire-nav .questionnaire__nav--mobile .questionnaire__item__wrapper .questionnaire__item:last-of-type'))
          .click();
  }

  navigateTroughQuestions() {
      element(by.css('app-questionnaire-item .questionnaire__body .carousel-indicators li:not(.active)')).click();
  }

  addQuestion(title: string) {
      element(by.css('app-questionnaire-item .questionnaire__body .carousel-inner .carousel-item.active .question__footer span')).click();
      const titleInput = element(by.css('app-question-item-view .question__item__title'));
      titleInput.sendKeys(title);
      const answers = element.all(by.css('app-question-item-view .question__item__body__inner .answer__wrapper'));
      answers.each((answer) => {
        answer.element(by.css('.answer__item')).sendKeys('Default answer');
      });
      element(by.css('app-question-item-view .question__item__footer .question__item__save')).click();
  }

  updateQuestionTitle(title: string) {
      element(by.css('app-questionnaire-item .questionnaire__body .carousel-item.active .question__body .question__item__wrapper:last-of-type .question__item')).click();
      const titleInput = element(by.css('app-question-item-view .question__item__title'));
      titleInput.clear();
      titleInput.sendKeys(title);
      element(by.css('app-question-item-view .question__item__footer .question__item__save')).click();
  }

  removeLastQuestion() {
      element(by.css('app-questionnaire-item .questionnaire__body .carousel-item.active .question__body .question__item__wrapper:last-of-type .question__item')).click();
      element(by.css('app-question-item-view .question__item__footer .question__item__delete')).click();
  }
}
