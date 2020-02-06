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
  @Input() isEdit: boolean = false;
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
