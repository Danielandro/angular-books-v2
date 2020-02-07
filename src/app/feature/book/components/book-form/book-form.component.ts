import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import IBook from "src/app/shared/book";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent implements OnInit {
  @Input() book: IBook;
  @Input() isEdit: boolean;
  @Input() buttonText: string;
  @Output() bookData: EventEmitter<IBook> = new EventEmitter<IBook>();
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  submitBook(title: string, author: string, imageUrl: string) {
    this.book
      ? this.bookData.emit({ id: this.book.id, title, author, imageUrl })
      : this.bookData.emit({ id: 0, title, author, imageUrl });
  }

  goBack() {
    this.navigate.emit();
  }
}
