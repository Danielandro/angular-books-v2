import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { BookListComponent } from "./feature/book/pages/book-list/book-list.component";
import { BookCardComponent } from "./feature/book/components/book-card/book-card.component";
import { BookSearchComponent } from "./feature/book/components/book-search/book-search.component";
import { BookDetailComponent } from "./feature/book/pages/book-detail/book-detail.component";
import { BookFormComponent } from "./feature/book/components/book-form/book-form.component";
import { BookEditComponent } from "./feature/book/pages/book-edit/book-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCardComponent,
    BookSearchComponent,
    BookDetailComponent,
    BookFormComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "books", component: BookListComponent },
      { path: "books/:id", component: BookDetailComponent },
      { path: "books/new", component: BookEditComponent },
      { path: "books/:id/edit", component: BookEditComponent },
      { path: "", redirectTo: "books", pathMatch: "full" },
      { path: "**", component: BookListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
