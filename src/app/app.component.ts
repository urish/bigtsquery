import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AstSearchService, IQueryResult } from './ast-search.service';

interface IPreset {
  name: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public astQuery = 'FunctionDeclaration:has(ExportKeyword)>Identifier';
  public searching = false;
  public results: IQueryResult[];

  readonly presets: IPreset[] = [
    { name: 'Exported Functions', value: 'FunctionDeclaration:has(ExportKeyword)>Identifier' },
    { name: 'Exported Classes', value: 'ClassDeclaration:has(ExportKeyword)>Identifier' },
    { name: 'Angular Components', value: 'Decorator>CallExpression[expression.name=Component]' },
    { name: 'Vue Components', value: 'ClassDeclaration:has(HeritageClause Identifier[name=Vue])' },
    {
      name: 'BDD Tests',
      value: 'CallExpression[expression.name=describe] CallExpression[expression.name=it]',
    },
  ];

  constructor(private astSearch: AstSearchService) {}

  search() {
    this.searching = true;
    this.astSearch.search(this.astQuery).subscribe((results) => {
      this.results = results;
      this.searching = false;
    });
  }
}
