import { Component, OnInit, OnDestroy } from "@angular/core";
import IBook from "src/app/shared/book";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { BookService } from "src/app/services/book.service";
import { takeUntil } from "rxjs/operators";

@Component({
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"]
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book: IBook;
  pageTitle = "Book Details...";
  private unsubscribe$ = new Subject<void>();
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bookService
        .getBookById(+params.get("id"))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(book => (this.book = book));
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goBack() {
    this.router.navigate(["/books"]);
  }

  goToEdit() {
    this.router.navigate(["/books", this.book.id, "edit"]);
  }
}
