import { configure } from '@storybook/angular';

function loadStories() {
  require('../src/app/error-message/error-message.stories');
  require('../src/app/search-result/search-result.stories');
  require('../src/app/search-results/search-results.stories');
}

configure(loadStories, module);
