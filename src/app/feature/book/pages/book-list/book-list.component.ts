import { Component, OnInit } from "@angular/core";
import IBook from "src/app/shared/book";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  books$: Observable<IBook[]>;
  allBooks: IBook[];
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.books$ = this.bookService.getAllBooks();
  }

  onSearchTermChange({ searchTerm, searchBy }) {
    searchBy === "title"
      ? (this.books$ = this.bookService.searchByTitle(searchTerm))
      : (this.books$ = this.bookService.searchByAuthor(searchTerm));
  }

  onSearchByOptionChange(searchByOption: string) {
    console.log(searchByOption);
  }
}
