import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-book-search",
  templateUrl: "./book-search.component.html",
  styleUrls: ["./book-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookSearchComponent implements OnInit {
  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
  viewSearchOptions: boolean = true;
  constructor() {}

  ngOnInit() {}

  onSearchTermChange(searchTerm: string) {
    this.searchTerm.emit(searchTerm);
  }

  toggleSearchOptions() {
    this.viewSearchOptions = !this.viewSearchOptions;
  }
}
