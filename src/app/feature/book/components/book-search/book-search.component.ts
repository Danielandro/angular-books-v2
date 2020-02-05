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
  @Output() searchTerm: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() searchByOption: EventEmitter<string> = new EventEmitter<string>();
  viewSearchOptions: boolean = true;
  searchBy: string = "title";
  constructor() {}

  ngOnInit() {}

  onSearchTermChange(searchTerm: string) {
    this.searchTerm.emit({ searchTerm, searchBy: this.searchBy });
  }

  toggleSearchOptions() {
    this.viewSearchOptions = !this.viewSearchOptions;
  }

  onSearchByChange(event: any) {
    this.toggleSearchOptions(); // hide dropdown menu
    this.searchBy = event.target.innerText; // change text to match option
    // this.searchByOption.emit(event.target.innerText);
    this.onSearchTermChange("");
  }
}
