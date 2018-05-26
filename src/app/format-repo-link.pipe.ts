import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRepoLink',
  pure: true,
})
export class FormatRepoLinkPipe implements PipeTransform {
  transform(value: string | undefined): any {
    const parts = (value || '').split('/');
    if (parts.length > 4) {
      return `[${parts[0]}/${parts[1]}] ${parts.slice(4).join('/')}`;
    }
    return '';
  }
}
