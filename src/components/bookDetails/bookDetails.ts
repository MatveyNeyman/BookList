import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { UUID } from 'angular2-uuid';

import { Book, Author, BookService, HttpService } from '../../app/exports';

@Component({
  selector: 'book-details',
  templateUrl: './bookDetails.html',
  styleUrls: ['./bookDetails.css']
})
export class BookDetails implements OnInit, OnChanges {
  @Input("book")
  private bookToEdit: Book;
  public book: Book;

  @ViewChild('fileInput')
  fileInputElem: ElementRef;

  public dateMask: Array<string | RegExp> = [/[0-3]/, /\d/, '.', /[0-1]/, /\d/, '.', /[0-2]/, /\d/, /\d/, /\d/];
  // public isbnMask: Array<string | RegExp> = [/[0-3]/, /\d/, '.', /[0-1]/, /\d/, '.', /[0-2]/, /\d/, /\d/, /\d/];
  public isSaveClicked: boolean = false;

  private isNewBook: boolean = false;

  @Output()
  destroySelf: EventEmitter<any> = new EventEmitter<any>();

  constructor(private bookService: BookService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    if (!this.bookToEdit) {
      this.isNewBook = true;
      this.book = new Book();
    } else {
      this.book = this.copyInputBook(this.bookToEdit);
    }
  }

  private copyInputBook(book: Book): Book {
    // Copying object
    return JSON.parse(JSON.stringify(book));
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
    this.isSaveClicked = true;
    
    if (this.book.header &&
        this.isAuthorsValid() &&
        this.book.length > 0 && this.book.length <= 10000 &&
        this.book.publishYear >= 1800 && this.book.publishYear <= this.getCurrentYear() &&
        this.isIssueDateValid() &&
        this.isISBNValid()) {
      if (this.isNewBook) {
        this.bookService.addBook(this.book);
      } else {
        this.bookService.updateBook(this.bookToEdit, this.book);
      }
      this.destroySelf.emit();
    } else {
      return;
    }
  }

  onCancel(): void {
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

  public isIssueDateValid(): boolean {
    let date = this.book.issueDate.split(".");
    let day = date[0];
    let month = date[1];
    let year = date[2];

    switch (day) {
      case "31":
        if (month !== "1" &&
            month !== "3" &&
            month !== "5" &&
            month !== "7" &&
            month !== "8" &&
            month !== "10" &&
            month !== "12") return false;
        break;
      case "30":
        if (month !== "4" &&
            month !== "6" &&
            month !== "9" &&
            month !== "11") return false;
        break;
      case "29":
        if (month !== "2" &&
            Number(year)%4 !== 0 ) return false;
        break;
      case "28":
        if (month !== "2") return false;
        break;
      default:
        if (Number(day) < 1 || Number(day) > 31) return false;
        break;
    }

    if (Number(month) > 12 ||
        Number(year) < 1800 ||
        Number(year) > this.getCurrentYear() ||
        Number(year) < this.book.publishYear) return false;

    return true;  
  }

  public isISBNValid(): boolean {
    if (this.book.ISBN) {
      // Algorithms taken from wikipedia
      if (this.book.ISBN.length === 10) {
        let sum: number = 0;
        let t: number = 0;
        for (let i = 0; i < 10; i++) {
          t += Number(this.book.ISBN.charAt(i));
          sum += t;
        }
        return sum % 11 === 0 ? true : false;
      } else if (this.book.ISBN.length === 13) {
        let sum: number = 0;
        let mult: number = 1;
        for (let i = 0; i < 13; i++) {
          if (i%2 > 0) {
            mult = 3;
          } else {
            mult = 1;
          }
          sum = sum + Number(this.book.ISBN.charAt(i)) * mult;
        }
        return sum % 10 === 0 ? true : false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private isAuthorsValid(): boolean {
    for (let author of this.book.authors) {
      if (!author.firstName || !author.lastName) {
        return false;
      }
    }
    return true;
  }

  ngOnChanges(): void {
      if (this.book && this.bookToEdit.id !== this.book.id) {
        this.book = this.copyInputBook(this.bookToEdit);
      }
  }

  public getCurrentYear(): number {
    return new Date().getFullYear();
  }
}