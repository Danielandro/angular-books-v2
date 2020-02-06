import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  templateUrl: "./book-edit.component.html",
  styleUrls: ["./book-edit.component.scss"]
})
export class BookEditComponent implements OnInit {
  formHeader: string = "Edit Book";
  constructor(private location: Location) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
