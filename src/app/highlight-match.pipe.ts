import { Pipe, PipeTransform } from '@angular/core';
import { IASTQueryMatch } from './ast-search.service';
import * as escapeHtml from 'escape-html';

@Pipe({
  name: 'highlightMatch',
  pure: true,
})
export class HighlightMatchPipe implements PipeTransform {
  transform(value: string | undefined, result: IASTQueryMatch): any {
    if (!value) {
      return '';
    }

    const lines = value.split('\n');
    const matchLineNum = result.matchLine - result.line;
    const matchLine = lines[matchLineNum] || '';
    const linesBefore = lines.slice(0, matchLineNum).join('\n');
    const textBefore =
      (matchLineNum > 0 ? linesBefore + '\n' : '') + matchLine.substr(0, result.matchChar);
    return (
      escapeHtml(textBefore) +
      (result.matchLength
        ? `<mark>${escapeHtml(value.substr(textBefore.length, result.matchLength))}</mark>`
        : '') +
      escapeHtml(value.substr(textBefore.length + result.matchLength))
    );
  }
}
