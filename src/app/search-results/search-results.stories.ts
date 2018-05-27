import { MatCardModule } from '@angular/material';
import '@angular/material/prebuilt-themes/indigo-pink.css';
import { storiesOf } from '@storybook/angular';
import '../../styles.css';
import { FormatRepoLinkPipe } from '../format-repo-link.pipe';
import { HighlightMatchPipe } from '../highlight-match.pipe';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchResultsComponent } from './search-results.component';

storiesOf('SearchResults', module)
  .add('5 search results', () => ({
    component: SearchResultsComponent,
    moduleMetadata: {
      declarations: [HighlightMatchPipe, FormatRepoLinkPipe, SearchResultComponent],
      imports: [MatCardModule],
    },
    props: {
      results: require('./search-results.fixture.json'),
    },
  }))
  .add('no search results', () => ({
    component: SearchResultsComponent,
    moduleMetadata: {
      declarations: [HighlightMatchPipe, FormatRepoLinkPipe, SearchResultComponent],
      imports: [MatCardModule],
    },
    props: {
      results: [],
    },
  }));
