import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AstSearchService, IQueryResponse } from '../ast-search.service';

interface IPreset {
  name: string;
  value: string;
}

@Component({
  selector: 'app-query-main',
  templateUrl: './query-main.component.html',
  styleUrls: ['./query-main.component.css'],
})
export class QueryMainComponent implements OnInit, OnDestroy {
  public astQuery = 'FunctionDeclaration:has(ExportKeyword)>Identifier';
  public searching = false;
  public queryResponse: IQueryResponse = {};

  private destroy$ = new Subject<void>();

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

  constructor(
    private astSearch: AstSearchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const { selector } = params;
      if (selector && this.astQuery !== selector) {
        this.astQuery = selector;
        this.search();
      }
    });
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  public search() {
    this.searching = true;
    this.queryResponse = {};
    this.updateQueryParams(this.astQuery);
    this.astSearch.search(this.astQuery).subscribe((response) => {
      this.queryResponse = response;
      this.searching = false;
    });
  }

  private updateQueryParams(selector: string) {
    this.router.navigate(['.'], { queryParams: { selector } });
  }
}
