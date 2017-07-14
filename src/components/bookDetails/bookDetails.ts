import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SlicePipe } from '@angular/common';

import { Book, Author, BookService } from '../../app/exports';

@Component({
  selector: 'book-details',
  templateUrl: './bookDetails.html',
  styleUrls: ['./bookDetails.css'],
  providers: [BookService]
})
export class BookDetails implements OnInit {
  @Input("book")
  public book: Book;
  
  private isNewBook: boolean = false;

  @Output()
  destroySelf: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    if (!this.book) {
      this.isNewBook = true;
      this.book = new Book();
    }
  }

  onDeleteAuthor(author: Author): void {
    let index = this.book.authors.indexOf(author);
    if (index > -1) {
        this.book.authors.splice(index, 1);
    }
  }

  onAddAuthor(): void {
    let author: Author = new Author();
    this.book.authors.push(author);
  }

  onSave(): void {
    if (this.isNewBook) {
      this.bookService.addBook(this.book);
    }
    this.destroySelf.emit();
  }
}