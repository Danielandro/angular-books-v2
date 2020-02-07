import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import IBook from "src/app/shared/book";
import { Observable } from "rxjs";

@Component({
  templateUrl: "./book-edit.component.html",
  styleUrls: ["./book-edit.component.scss"]
})
export class BookEditComponent implements OnInit {
  book$: Observable<IBook>;
  pageTitle: string = "Add New Book";
  buttonFunction: string = "Add Book";
  editPage = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get("id")) {
        this.book$ = this.bookService.getBookById(+params.get("id"));
        this.pageTitle = "Edit Book";
        this.editPage = !this.editPage;
        this.buttonFunction = "Update Book";
        return;
      }
    });
  }

  // ADD PAGE: User submits a new book
  onBookData(book: IBook) {
    // convert all to lowercase
    book.title = book.title.trim().toLocaleLowerCase();
    book.author = book.author.trim().toLocaleLowerCase();
    book.imageUrl = book.imageUrl.trim().toLocaleLowerCase();

    // check fields are not empty
    if (!book.title || !book.author || !book.imageUrl) {
      return;
    }

    if (this.editPage) {
      this.bookService.updateBook(book).subscribe(
        book => {
          console.log("Updating book: ", book);
        },
        err => console.log("Error: ", err),
        () => {
          this.bookService.reload(); // empty book cache
          this.router.navigate(["/books"]); // navigate to main page
        }
      );
    } else {
      // set book id
      book.id = this.bookService.generateId();
      this.bookService.addBook(book).subscribe(
        book => {
          console.log("New book created", book);
        },
        err => console.log("error", err),
        () => {
          // on subscription completion
          this.bookService.reload();
          this.router.navigate(["/books"]);
        }
      );
    }
  }

  // navigate to previous page
  goBack() {
    this.location.back();
  }
}
