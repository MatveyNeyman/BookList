import { IBook } from '../app/exports';
 
const dateOne = new Date("Thu Jul 13 1911 19:06:51 GMT+0300 (Russia TZ 2 Standard Time)");
const dateTwo = new Date("Thu Jul 13 2000 19:06:51 GMT+0300 (Russia TZ 2 Standard Time)");

export const BOOKS: IBook[] = [
    {
        header: "First book",
        authors: [
            {
                firstName: "First author name",
                lastName: "First author surname"
            },
            {
                firstName: "Second author name",
                lastName: "Second author surname"
            }
        ],
        length: 500,
        publisher: "Best printing house",
        publishYear: 1910,
        issueYear: dateOne,
        ISBN: 123456789,
        image: null
    },
    {
        header: "Second book",
        authors: [
            {
                firstName: "First author name",
                lastName: "First author surname"
            },
            {
                firstName: "Second author name",
                lastName: "Second author surname"
            }
        ],
        length: 500,
        publisher: "Worst printing house",
        publishYear: 2000,
        issueYear: dateTwo,
        ISBN: 987654321,
        image: null
    },
];

