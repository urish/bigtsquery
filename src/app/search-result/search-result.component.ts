import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/keep-markup/prism-keep-markup';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { IASTQueryMatch } from '../ast-search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements AfterViewInit {
  @Input() result: IASTQueryMatch;

  @ViewChild('codeEl', { read: ElementRef })
  codeEl: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    Prism.highlightElement(this.codeEl.nativeElement);
  }
}
