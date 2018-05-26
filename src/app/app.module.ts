import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HighlightMatchPipe } from './highlight-match.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FormatRepoLinkPipe } from './format-repo-link.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchResultsComponent,
    HighlightMatchPipe,
    SearchResultComponent,
    FormatRepoLinkPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
