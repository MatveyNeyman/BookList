import { BookListPage } from './app.po';

describe('book-list App', () => {
  let page: BookListPage;

  beforeEach(() => {
    page = new BookListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
