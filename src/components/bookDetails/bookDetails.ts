import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { UUID } from 'angular2-uuid';

import { Book, Author, BookService, HttpService } from '../../app/exports';

@Component({
  selector: 'book-details',
  templateUrl: './bookDetails.html',
  styleUrls: ['./bookDetails.css']
})
export class BookDetails implements OnInit {
  @Input("book")
  public book: Book;

  @ViewChild('fileInput')
  fileInputElem: ElementRef;
  
  private isNewBook: boolean = false;

  @Output()
  destroySelf: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bookService: BookService,
              private httpService: HttpService) { }

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

  uploadImage(): void {
    let fileElem: HTMLInputElement = this.fileInputElem.nativeElement;
    let image: File = fileElem.files.item(0);

    if (image) {
      let uuid = UUID.UUID();
      let ext = image.name.substr(image.name.lastIndexOf('.') + 1);
      let newName = uuid + "." + ext;

      this.httpService.saveImage(image, newName).subscribe(result => {
        console.log(result);
        this.book.image = newName;
      });
    }
  }
}