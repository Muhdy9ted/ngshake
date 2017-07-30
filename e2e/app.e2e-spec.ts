import { NgshakePage } from './app.po';

describe('ngshake App', () => {
  let page: NgshakePage;

  beforeEach(() => {
    page = new NgshakePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
