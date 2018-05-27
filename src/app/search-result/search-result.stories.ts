import { storiesOf } from '@storybook/angular';
import { SearchResultComponent } from './search-result.component';
import { HighlightMatchPipe } from '../highlight-match.pipe';

import '../../styles.css';

storiesOf('SearchResult', module)
  .add('with a single line of code', () => ({
    component: SearchResultComponent,
    moduleMetadata: {
      declarations: [HighlightMatchPipe],
    },
    props: {
      result: {
        text: 'interface MyInterface {}',
        line: 0,
        matchLine: 0,
        matchChar: 10,
        matchLength: 11,
      },
    },
  }))
  .add('with a multiple lines of code', () => ({
    component: SearchResultComponent,
    moduleMetadata: {
      declarations: [HighlightMatchPipe],
    },
    props: {
      result: {
        line: 1,
        matchChar: 0,
        matchLine: 2,
        matchLength: 151,
        text:
          `let secureProtocols = ['https:', 'wss:'];\n` +
          `function isSecureProtocol(url: string): boolean {\n` +
          `  const { protocol } = parse(url.toLowerCase());\n` +
          `  return secureProtocols.indexOf(protocol) !== -1;\n` +
          `}\n` +
          `function g() {`,
      },
    },
  }));
