import { Component, OnInit } from "@angular/core";
import IBook from "src/app/shared/book";
import { Observable } from "rxjs";
import { BookService } from "src/app/services/book.service";
import { Router } from "@angular/router";
import { distinctUntilChanged, shareReplay, tap } from "rxjs/operators";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  books$: Observable<IBook[]>;
  allBooks: IBook[];
  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.books$ = this.bookService.getAllBooks().pipe(
      distinctUntilChanged(),
      // shareReplay(1),
      tap(x => console.log("Http request"))
    );
  }

  onSearchTermChange({ searchTerm, searchBy }) {
    this.books$ = this.bookService.searchBooks({ searchTerm, searchBy });
  }

  onSearchByOptionChange(searchByOption: string) {
    console.log(searchByOption);
  }

  onButtonClicked({ bookId, action }) {
    if (action === "edit") {
      this.router.navigate(["/books", bookId, "edit"]);
    }
  }
}
