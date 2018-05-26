import { FormatRepoLinkPipe } from './format-repo-link.pipe';

describe('FormatRepoLinkPipe', () => {
  const pipe = new FormatRepoLinkPipe();
  it('should format the given repo link', () => {
    expect(pipe.transform('foo/bar/blob/master/dir/name.ts')).toEqual('[foo/bar] dir/name.ts');
  });

  it('should return an empty string given undefined value', () => {
    expect(pipe.transform(undefined)).toEqual('');
  });
});
