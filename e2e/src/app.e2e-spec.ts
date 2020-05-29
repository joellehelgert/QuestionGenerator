import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(true);
  });

  it('should display question generator title', () => {
      page.navigateToLogin();
      page.login();
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


  it('should navigate through question types with the slider', async () => {
      page.navigateTo();
      expect(page.getQuestionTypeTitleText()).toEqual('TimeLineQuestions');
      page.navigateTroughQuestions();
      browser.driver.sleep(2000); // sleeps for sliding
      expect(await page.getQuestionTypeTitleText()).toEqual('BuzzerQuestions');
  });

  it('should add question', async () => {
      page.navigateTo();
      expect(page.getLastQuestionTitle()).not.toBe('Question Title 1');
      page.addQuestion('Question Title 1');
  });

  it('should update a question', async () => {
    page.navigateTo();
    expect(page.getLastQuestionTitle()).toBe('Question Title 1');
    page.updateQuestionTitle('Question Title Updated');
  });

  it('should remove question', async () => {
      page.navigateTo();
      expect(page.getLastQuestionTitle()).toBe('Question Title Updated');
      page.removeLastQuestion();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
