import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import IBook from "../shared/book";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BookService {
  bookUrl: string = "http://localhost:3000/books";

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<IBook[]> {
    return this.http
      .get<IBook[]>(this.bookUrl)
      .pipe(tap(books => console.log(books)));
  }
}
