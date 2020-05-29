import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToLogin(): Promise<unknown> {
    return browser.get('/login') as Promise<unknown>;
  }
  navigateTo(): Promise<unknown> {
    return browser.get('/questionnaire') as Promise<unknown>;
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
      browser.waitForAngularEnabled(false);
      element(by.css('app-question-item-view .question__item__footer .question__item__save')).click().then(() => {
          browser.sleep(2000);
          expect(this.getLastQuestionTitle()).toBe(title);
      });
  }

  updateQuestionTitle(title: string) {
      element(by.css('app-questionnaire-item .questionnaire__body .carousel-item.active .question__body .question__item__wrapper:last-of-type .question__item')).click();
      const titleInput = element(by.css('app-question-item-view .question__item__title'));
      titleInput.clear();
      titleInput.sendKeys(title);
      browser.waitForAngularEnabled(false);
      element(by.css('app-question-item-view .question__item__footer .question__item__save')).click().then(() => {
          browser.sleep(1000);
          expect(this.getLastQuestionTitle()).toBe(title);
      });
  }

  removeLastQuestion() {
      element(by.css('app-questionnaire-item .questionnaire__body .carousel-item.active .question__body .question__item__wrapper:last-of-type .question__item')).click();
      browser.waitForAngularEnabled(false);
      element(by.css('app-question-item-view .question__item__footer .question__item__delete')).click().then(() => {
          browser.sleep(1000);
          expect(this.getLastQuestionTitle()).not.toBe('Question Title Updated');
      });
  }

  login() {
      const emailInput = element(by.css('.auth__item--email'));
      const passwordInput = element(by.css('.auth__item--password'));
      emailInput.clear();
      emailInput.sendKeys('123456@gmx.net');
      passwordInput.clear();
      passwordInput.sendKeys('123456');
      browser.waitForAngularEnabled(false);
      element(by.css('.submit__button')).click().then(() => {
          browser.driver.sleep(2000);
      });
  }
}
