import { getSqlQuery, getUmlCode, getUmlCodeCount, getSqlCount } from './sql-query';
import * as tsquery from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';

describe('sql-query', () => {
  it('getUmlCode', () => {
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
      expect(getSqlQuery()).toEqual(expect.any(String));
    });
  });

  it('getUmlCodeCount', () => {
    const umlCode = getUmlCodeCount();
    const umlFunction = new Function('src', 'query', 'const { ts } = this; ' + umlCode);
    const sourceCode = `
      interface MyInterface {}
    `.trim();
    expect(
      umlFunction.call({ tsquery, ts }, sourceCode, 'InterfaceDeclaration>Identifier'),
    ).toEqual([1]);
  });

  describe('getSqlCount', () => {
    it('should return a string', () => {
      expect(getSqlCount()).toEqual(expect.any(String));
    });
  });
});
