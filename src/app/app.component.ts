import { Component, OnInit } from '@angular/core';

import { BookService, IBook } from './exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookService]
})
export class AppComponent implements OnInit {
  public title: string = "Books List App";
  public books: Array<IBook>;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.books = this.bookService.getBooks();
  }
}