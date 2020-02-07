import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import IBook from "../shared/book";
import { tap, map, shareReplay, catchError, takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BookService {
  bookUrl: string = "http://localhost:3000/books";
  private bookCache$: Observable<IBook[]>;
  private destroy$ = new Subject();
  booksLength: number;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<IBook[]> {
    // if books haven't been cached, get all books
    if (!this.bookCache$) {
      console.log("Nothing Cached");
      this.bookCache$ = this.http.get<IBook[]>(this.bookUrl).pipe(
        tap(books => {
          console.log(books);
          this.booksLength = books.length;
        }),
        takeUntil(this.destroy$),
        shareReplay(1),
        catchError(this.handleError)
      );
    }
    return this.bookCache$;
  }

  reload() {
    this.destroy$.next(); // complete the subscription
    this.bookCache$ = null; // clear cache
  }
  getBookById(id: number): Observable<IBook> {
    return this.getAllBooks().pipe(
      map(books => books.find(book => book.id === id))
    );
  }

  searchBooks({ searchTerm, searchBy }): Observable<IBook[]> {
    return this.getAllBooks().pipe(
      map(books =>
        books.filter(book => book[`${searchBy}`].includes(searchTerm))
      ),
      catchError(this.handleError)
    );
  }

  addBook(book: IBook): Observable<any> {
    // post request with new book
    return this.http
      .post(this.bookUrl, book)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  updateBook(book: IBook): Observable<any> {
    return this.http
      .patch(`${this.bookUrl}/${book.id}`, book)
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

  generateId(): number {
    return this.booksLength > 0 ? this.booksLength + 1 : 1;
  }
}
