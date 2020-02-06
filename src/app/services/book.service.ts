import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import IBook from "../shared/book";
import {
  tap,
  filter,
  map,
  shareReplay,
  distinctUntilChanged,
  catchError
} from "rxjs/operators";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class BookService {
  bookUrl: string = "http://localhost:3000/books";
  books$: Observable<IBook[]> = this.http
    .get<IBook[]>(this.bookUrl)
    .pipe(distinctUntilChanged(), shareReplay(1));

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<IBook[]> {
    return this.books$.pipe(
      tap(books => console.log(books)),
      catchError(this.handleError)
    );
  }

  getBookById(id: number): Observable<IBook> {
    return this.books$.pipe(map(books => books.find(book => book.id === id)));
  }

  searchBooks({ searchTerm, searchBy }): Observable<IBook[]> {
    return this.books$.pipe(
      map(books =>
        books.filter(book => book[`${searchBy}`].includes(searchTerm))
      ),
      catchError(this.handleError)
    );
  }

  createBook(book: IBook): Observable<any> {
    // generate and set book id
    this.books$.subscribe(books => {
      const bookIds = books.map(book => book.id); // array of book ids
      book.id = this.generateId(bookIds);
    });
    // post request with new book
    return this.http
      .post(this.bookUrl, book)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly!
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private generateId(bookIds): number {
    return bookIds.length > 0 ? Math.max(...bookIds) + 1 : 1;
  }
}
