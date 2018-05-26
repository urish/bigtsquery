import { HighlightMatchPipe } from './highlight-match.pipe';

describe('HighlightMatchPipe', () => {
  const pipe = new HighlightMatchPipe();

  it('escape HTML in the given input', () => {
    const match = {
      id: '',
      text: 'hello("<foo>")',
      line: 0,
      matchLine: 0,
      matchChar: 0,
      matchLength: 0,
    };
    expect(pipe.transform(match.text, match)).toBe('hello(&quot;&lt;foo&gt;&quot;)');
  });

  it('highlight the given match', () => {
    const match = {
      line: 0,
      matchChar: 9,
      matchLine: 1,
      matchLength: 1,
      text: 'function f() {\n  return 5;\n}',
    };
    expect(pipe.transform(match.text, match)).toBe('function f() {\n  return <mark>5</mark>;\n}');
  });

  it('should return empty text given undefined input parameter', () => {
    const match = {
      id: '',
      text: '',
      line: 0,
      matchLine: 0,
      matchChar: 0,
      matchLength: 0,
    };
    expect(pipe.transform(undefined, match)).toBe('');
  });
});
