import { IBook } from '../app/exports';

export const BOOKS: IBook[] = [
    {
        header: "First book",
        authors: [
            {
                firstName: "Jill",
                lastName: "Smith"
            },
            {
                firstName: "Eve",
                lastName: "Jackson"
            }
        ],
        length: 500,
        publisher: "Best printing house",
        publishYear: 1910,
        issueDate: "01.03.1911",
        ISBN: 123456789,
        image: null
    },
    {
        header: "Second book",
        authors: [
            {
                firstName: "John",
                lastName: "Doe"
            },
            {
                firstName: "Erich",
                lastName: "Gamma"
            }
        ],
        length: 500,
        publisher: "Worst printing house",
        publishYear: 2000,
        issueDate: "04.06.2002",
        ISBN: 987654321,
        image: null
    },
];

// Richard Helm,
// Ralph Johnson,
// John Vlissides