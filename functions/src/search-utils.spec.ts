import { tsquery } from '@phenomnomnominal/tsquery';
import { getTextAround } from './search-utils';

// tslint:disable:no-floating-promises

describe('getTextAround', () => {
  it('should return the lines around the given source code position', () => {
    const ast = tsquery.ast(
      `
function f() {
  return 5;
}`.trim(),
    );
    const [node] = tsquery.query(ast, 'FirstLiteralToken');
    expect(getTextAround(node)).toEqual({
      line: 0,
      matchChar: 9,
      matchLine: 1,
      matchLength: 1,
      text: 'function f() {\n  return 5;\n}',
    });
  });
});
