import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';

import { BookService, Book, Author } from '../../app/exports';

@Component({
  selector: 'book-list',
  templateUrl: './bookList.html',
  styleUrls: ['./bookList.css'],
  providers: [BookService]
})
export class BookList implements OnInit {
  public books: Array<Book>;
  public selectedBook: Book;
  public isAddBook: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.books = this.bookService.getBooks();
  }

  onSelect(book: Book): void {
    this.isAddBook = false;
    this.selectedBook = book;
  }

  onDeleteBook(book: Book): void {
    let index = this.books.indexOf(book);
    if (index > -1) {
        this.books.splice(index, 1);
        this.selectedBook = null;
    }
  }

  onAddBook(): void {
    this.isAddBook = true;
  }

  onClearDetails(): void {
    this.isAddBook = false;
    this.selectedBook = null;
  }
}