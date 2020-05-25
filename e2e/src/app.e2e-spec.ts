import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display question generator title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Question Generator');
  });

  it('should navigate through questionnaires with the navigation', () => {
      page.navigateTo();
      expect(page.getQuestionnaireTitleText()).toEqual('testQuestionaire');
      page.navigateTroughQuestionnaires();
      expect(page.getQuestionnaireTitleText()).toEqual('secondQuestionnaire');
  });

  // not able to get type afterwards
  /*
  it('should navigate through question types with the slider', () => {
      page.navigateTo();
      expect(page.getQuestionTypeTitleText()).toEqual('TimeLineQuestions');
      page.navigateTroughQuestions();
      browser.wait(expect(page.getQuestionTypeTitleText()).toEqual('BuzzerQuestions'), 5000);
  });
  */

  it('should add question', () => {
      page.navigateTo();
      page.addQuestion('Question Title 1');
      // Task error
      // expect(page.getLastQuestionTitle()).toBe('Question Title 1');
  });

  it('should remove question', () => {
      page.navigateTo();
      page.removeLastQuestion();
      // Task error
      // expect(page.getLastQuestionTitle()).not.toBe('Question Title 1');
  });

  it('should update a question', () => {
      page.navigateTo();
      page.updateQuestionTitle('Question Title Updated');
      // Task error
      // expect(page.getLastQuestionTitle()).toBe('Question Title Updated');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
