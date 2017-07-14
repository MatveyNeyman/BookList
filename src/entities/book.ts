import { Author } from '../app/exports';

export class Book {
    header: string;
    authors: Array<Author>;
    length: number; // book's length
    publisher?: string;
    publishYear: number;
    issueDate: string;
    ISBN: number;
    image?: string;
    constructor() {
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