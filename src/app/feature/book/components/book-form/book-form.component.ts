import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent implements OnInit {
  @Output() bookData: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  submitBook(title: string, author: string, imageUrl: string) {
    this.bookData.emit({ title, author, imageUrl });
  }

  goBack() {
    this.navigate.emit();
  }
}
