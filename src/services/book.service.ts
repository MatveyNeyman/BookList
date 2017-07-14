import { Injectable } from '@angular/core';

import { Book, books } from '../app/exports';

@Injectable()
export class BookService {
  getBooks(): Book[] {
    return books;
  }

  addBook(book: Book): void {
    books.push(book);
  }
}