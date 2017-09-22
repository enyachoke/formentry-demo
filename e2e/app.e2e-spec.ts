import { FormentryDemoPage } from './app.po';

describe('formentry-demo App', () => {
  let page: FormentryDemoPage;

  beforeEach(() => {
    page = new FormentryDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
