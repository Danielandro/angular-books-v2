import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./book-new.component.html",
  styleUrls: ["./book-new.component.scss"]
})
export class BookNewComponent implements OnInit {
  formHeader: string = "Add New Book";
  constructor() {}

  ngOnInit() {}
}
