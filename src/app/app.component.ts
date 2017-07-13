import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';

import { BookService, IBook, IAuthor } from './exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookService]
})
export class AppComponent implements OnInit {
  public books: Array<IBook>;
  public selectedBook: IBook;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.books = this.bookService.getBooks();
  }

  onSelect(book: IBook): void {
    this.selectedBook = book;
  }

  onDeleteAuthor(author: IAuthor): void {
    let index = this.selectedBook.authors.indexOf(author);
    if (index > -1) {
        this.selectedBook.authors.splice(index, 1);
    }
  }

  onAddAuthor(): void {
    let author: IAuthor = {
      firstName: "",
      lastName: ""
    };
    this.selectedBook.authors.push(author);
  }

  onDeleteBook(book: IBook): void {
    let index = this.books.indexOf(book);
    if (index > -1) {
        this.books.splice(index, 1);
        this.selectedBook = null;
    }
  }

  onAddBook(): void {
    let book: any;
    this.books.push(book);
  }
}