import { Author } from '../app/exports';
import { UUID } from 'angular2-uuid';

export class Book {
    id: string;
    header: string;
    authors: Array<Author>;
    length: number; // book's length
    publisher?: string;
    publishYear: number;
    issueDate: string;
    ISBN: string;
    image?: string;
    constructor() {
        this.id = UUID.UUID();
        
        this.header = "";

        let author: Author = new Author();
        this.authors = [];
        this.authors.push(author);

        this.length = null;
        this.publisher = "";
        this.publishYear = null;
        this.issueDate = "";
        this.ISBN = null;
        this.image = "";
    }
}