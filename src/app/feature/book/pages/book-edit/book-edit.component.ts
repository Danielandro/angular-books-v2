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
  formHeader: string = "Add New Book";
  editPage = false;
  buttonFunction: string = "Add Book";

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // If an ID has been passed
      if (params.get("id")) {
        this.book$ = this.bookService.getBookById(+params.get("id"));
        this.formHeader = "Edit Book";
        this.editPage = !this.editPage;
        this.buttonFunction = "Update Book";
        return;
      }
    });
  }

  // ADD PAGE: User submits a new book
  onBookData(book) {
    // convert all to lowercase
    book.title = book.title.trim().toLocaleLowerCase();
    book.author = book.author.trim().toLocaleLowerCase();
    book.imageUrl = book.imageUrl.trim().toLocaleLowerCase();

    // check fields are not empty
    if (!book.title || !book.author || !book.imageUrl) {
      return;
    }

    if (this.editPage) {
      this.bookService.updateBook(book).subscribe(res => {
        this.router.navigate(["/books"]);
      });
    } else {
      // create the book
      this.bookService.createBook(book).subscribe(res => {
        this.router.navigate(["/books"]);
      });
    }
  }

  // navigate to previous page
  goBack() {
    this.location.back();
  }
}
