import { Injectable, OnInit } from '@angular/core';

import { Book } from '../app/exports';

@Injectable()
export class BookService implements OnInit {
  public books: Array<Book>;

  public isSortByHeader = false;
  public isSortByYear = false;
  public sortDirection: string = "";
  private sortUp: string = "arrow-up";
  private sortDown: string = "arrow-down";

  ngOnInit(): void {

  }

  public getBooks(): Book[] {
    return this.books;
  }

  public addBook(book: Book): void {
    this.books.push(book);
    if (this.sortDirection) {
      this.sortBooks();
    }
  }

  public updateBook(oldVal, newVal) {
    let index = this.books.indexOf(oldVal);
    this.books[index] = newVal;
    if (this.sortDirection) {
      this.sortBooks();
    }
  }

  public sortByHeader(): void {
    if (this.isLocaleCompareSupportsLocales()) {
        this.books.sort((a, b) => {
          if (this.sortDirection === this.sortUp) {
            return a.header.localeCompare(b.header);
          } else {
            return b.header.localeCompare(a.header);
          }
        });
    } else {
      // sort by name
      this.books.sort(function(a, b) {
        var nameA = a.header.toUpperCase(); // ignore upper and lowercase
        var nameB = b.header.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          if (this.sortDirection === this.sortUp) {
            return -1;
          } else {
            return 1;
          }
        }
        if (nameA > nameB) {
          if (this.sortDirection === this.sortUp) {
            return 1;
          } else {
            return -1;
          }
        }
        // names must be equal
        return 0;
      });
    }
  }

  public sortByYear(): void {
    this.books.sort((a, b) => {
      if (this.sortDirection === this.sortUp) {
        return a.publishYear - b.publishYear;
      } else {
        return b.publishYear - a.publishYear;
      }
    }); 
  }

  public changeSortDirection(): void {
    this.sortDirection = this.sortDirection === this.sortUp ? this.sortDirection = this.sortDown : this.sortDirection = this.sortUp;
    localStorage.setItem("sortDirection", this.sortDirection);
    if (this.isSortByHeader) {
      localStorage.setItem("sortColumn", "header");
    } else if (this.isSortByYear) {
      localStorage.setItem("sortColumn", "year");
    }
  }

  private isLocaleCompareSupportsLocales() {
    try {
      'foo'.localeCompare('bar', 'i');
    } catch (e) {
      return e.name === 'RangeError';
    }
    return false;
  }

  public sortBooks(): void {
    if (this.isSortByHeader) {
      this.sortByHeader();
    } else {
      this.sortByYear();
    }
  }
}