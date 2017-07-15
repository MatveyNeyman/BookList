import { Injectable } from '@angular/core';

import { Book } from '../app/exports';

@Injectable()
export class BookService {
  public books: Array<Book>;

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): void {
    this.books.push(book);
  }
}