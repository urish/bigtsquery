import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AstSearchService, IQueryResult } from './ast-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public astQuery = 'FunctionDeclaration:has(ExportKeyword)>Identifier';
  public searching = false;
  public results: IQueryResult[];

  constructor(private astSearch: AstSearchService) {}

  search() {
    this.searching = true;
    this.astSearch.search(this.astQuery).subscribe((results) => {
      this.results = results;
      this.searching = false;
    });
  }
}
