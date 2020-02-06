import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
import IBook from "src/app/shared/book";

@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book: IBook;
  @Input() index: number;
  @Output() buttonAction: EventEmitter<{}> = new EventEmitter<{}>();
  constructor() {}

  ngOnInit() {}

  buttonClicked(bookId, action) {
    this.buttonAction.emit({ bookId, action });
  }
}
