import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';

import { BookService, HttpService, Book, Author } from '../../app/exports';

@Component({
  selector: 'book-list',
  templateUrl: './bookList.html',
  styleUrls: ['./bookList.css'],
  providers: [HttpService]
})
export class BookList implements OnInit {
  public books: Array<Book>;
  public selectedBook: Book;
  public isAddBook: boolean = false;

  constructor(public bookService: BookService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.httpService.getData().subscribe(result => {
      this.books = this.bookService.books = result;
      if (typeof(Storage) !== "undefined") {
          this.bookService.sortDirection = localStorage.getItem("sortDirection");
          let sortColumn = localStorage.getItem("sortColumn");
          switch (sortColumn) {
            case "header":
              this.bookService.isSortByHeader = true;
              this.bookService.isSortByYear = false;
              break;
            case "year":
              this.bookService.isSortByHeader = false;
              this.bookService.isSortByYear = true;
              break;
            default:
              break;
          }
          if (this.bookService.sortDirection && sortColumn) {
            this.bookService.sortBooks();
          }
      } else {
          console.log("Sorry! No Web Storage support");
      }
    });
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
  
  uploadList(): void {
    this.httpService.postData(this.books).subscribe(result => {
      console.log(result);
    });
  }

  onSortByHeader(): void {
    this.bookService.isSortByYear = false;
    this.bookService.isSortByHeader = true;
    this.bookService.changeSortDirection();
    this.bookService.sortByHeader();
  }
  
  onSortByYear(): void {
    this.bookService.isSortByHeader = false;
    this.bookService.isSortByYear = true;
    this.bookService.changeSortDirection();
    this.bookService.sortByYear();
  }
}