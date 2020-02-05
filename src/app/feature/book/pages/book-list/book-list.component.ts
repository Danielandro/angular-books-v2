import { Component, OnInit } from "@angular/core";
import IBook from "src/app/shared/book";
import { Observable } from "rxjs";
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
    this.books$ = this.bookService.searchBooks({ searchTerm, searchBy });
  }

  onSearchByOptionChange(searchByOption: string) {
    console.log(searchByOption);
  }
}
