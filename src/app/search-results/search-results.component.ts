import { Component, Input } from '@angular/core';
import { IQueryResult } from '../ast-search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  @Input() results: IQueryResult[];
}
