import { Injectable } from '@angular/core';

import { IBook, BOOKS } from '../app/exports';

@Injectable()
export class BookService {
  getBooks(): IBook[] {
    return BOOKS;
  }
}