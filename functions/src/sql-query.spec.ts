import { getSqlQuery, getUmlCode } from './sql-query';
import * as tsquery from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';

describe('sql-query', () => {
  describe('getUmlCode', () => {
    const umlCode = getUmlCode();
    const umlFunction = new Function('src', 'query', 'const { ts } = this; ' + umlCode);
    const sourceCode = `
      interface MyInterface {}
    `.trim();
    expect(
      umlFunction.call({ tsquery, ts }, sourceCode, 'InterfaceDeclaration>Identifier'),
    ).toEqual([
      '{"text":"interface MyInterface {}","line":0,"matchLine":0,"matchChar":10,"matchLength":11}',
    ]);
  });

  describe('getSqlQuery', () => {
    it('should return a string', () => {
      require('fs').writeFileSync('c:/p/query.sql', getSqlQuery());
      expect(getSqlQuery()).toEqual(expect.any(String));
    });
  });
});
