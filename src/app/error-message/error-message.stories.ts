import { storiesOf } from '@storybook/angular';
import { ErrorMessageComponent } from './error-message.component';
import { HighlightMatchPipe } from '../highlight-match.pipe';

import '../../styles.css';
import { MatCardModule, MatIconModule } from '@angular/material';

const moduleMetadata = {
  imports: [MatCardModule, MatIconModule],
};

storiesOf('ErrorMessage', module)
  .add('with invalid query error', () => ({
    component: ErrorMessageComponent,
    moduleMetadata,
    props: {
      message:
        'SyntaxError: Expected " ", "!", "#", "*", ".", ":", ":first-child", ":has(", ":last-child", ' +
        '":matches(", ":not(", ":nth-child(", ":nth-last-child(", "[" or [^ [\\],():#!=><~+.] but ">" found.',
      kind: 'queryError',
    },
  }))
  .add('with internal server error', () => ({
    component: ErrorMessageComponent,
    moduleMetadata,
    props: {
      message: 'Internal server error',
      kind: 'serverError',
    },
  }))
  .add('with request failed', () => ({
    component: ErrorMessageComponent,
    moduleMetadata,
    props: {
      message: 'Http failure response for (unknown url): 0 Unknown Error',
      kind: 'requestFailed',
    },
  }));
