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
    const [node] = tsquery.query(ast, 'NumericLiteral');
    expect(getTextAround(node)).toEqual({
      line: 0,
      matchChar: 9,
      matchLine: 1,
      matchLength: 1,
      text: 'function f() {\n  return 5;\n}',
    });
  });

  it('should return correct result for code with comments', () => {
    const ast = tsquery.ast(
      `
// this is a comment
function f() {
  return 5;
}`.trim(),
    );
    const [node] = tsquery.query(ast, 'NumericLiteral');
    expect(getTextAround(node)).toEqual({
      line: 0,
      matchChar: 9,
      matchLine: 2,
      matchLength: 1,
      text: '// this is a comment\nfunction f() {\n  return 5;\n}',
    });
  });

  it('should only return 1 line around the code for long match (4+ lines)', () => {
    const ast = tsquery.ast(
      `
import { parse } from 'url';
let secureProtocols = ['https:', 'wss:'];
function isSecureProtocol(url: string): boolean {
  const { protocol } = parse(url.toLowerCase());
  return secureProtocols.indexOf(protocol) !== -1;
}
function g() {
  return 4;
}
`.trim(),
    );
    const [node] = tsquery.query(ast, 'FunctionDeclaration');
    expect(getTextAround(node)).toEqual({
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
    });
  });
});
