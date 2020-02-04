import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { BookListComponent } from "./feature/book/pages/book-list/book-list.component";
import { BookCardComponent } from './feature/book/components/book-card/book-card.component';

@NgModule({
  declarations: [AppComponent, BookListComponent, BookCardComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
