import { configure } from '@storybook/angular';

function loadStories() {
  require('../src/app/search-result/search-result.stories');
  require('../src/app/search-results/search-results.stories');
}

configure(loadStories, module);
