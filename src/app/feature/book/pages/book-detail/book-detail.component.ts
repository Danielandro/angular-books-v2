import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  style,
  state,
  transition,
  animate,
  trigger
} from "@angular/animations";
import IBook from "src/app/shared/book";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { BookService } from "src/app/services/book.service";
import { takeUntil } from "rxjs/operators";

@Component({
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"],
  animations: [
    trigger("bigSmall", [
      state(
        "big",
        style({
          fontSize: "100px",
          color: "orange",
          transform: "translateY: -100px"
        })
      ),
      state(
        "small",
        style({
          height: "2px",
          color: "green",
          transform: "translateY: 100px"
        })
      ),
      transition("big <=> small", [animate("1s")])
    ])
  ]
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book: IBook;
  pageTitle = "Book Details...";
  isBig = false;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  toggleSize() {
    this.isBig = !this.isBig;
  }

  fadeIn() {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bookService
        .getBookById(+params.get("id"))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(book => (this.book = book));
    });
    this.fadeIn();
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
