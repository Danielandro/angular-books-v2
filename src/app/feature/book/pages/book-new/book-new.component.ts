import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import IBook from "src/app/shared/book";
import { Location } from "@angular/common";

@Component({
  templateUrl: "./book-new.component.html",
  styleUrls: ["./book-new.component.scss"]
})
export class BookNewComponent implements OnInit {
  formHeader: string = "Add New Book";
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  onBookData({ title, author, imageUrl }) {
    // convert all to lowercase
    title = title.trim().toLocaleLowerCase();
    author = author.trim().toLocaleLowerCase();
    imageUrl = imageUrl.trim().toLocaleLowerCase();

    // check fields are not empty
    if (!title || !author || !imageUrl) {
      return;
    }

    this.bookService
      .createBook({ id: 0, title, author, imageUrl } as IBook)
      .subscribe(res => {
        this.router.navigate(["/books"]);
      });
  }

  goBack() {
    this.location.back();
  }
}
