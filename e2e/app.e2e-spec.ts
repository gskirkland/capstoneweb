import { CodestockPortalPage } from './app.po';

describe('codestock-portal App', function() {
  let page: CodestockPortalPage;

  beforeEach(() => {
    page = new CodestockPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
