import * as ts from 'typescript';

export interface IMatch {
  text: string;
  line: number;
  matchLine: number;
  matchChar: number;
  matchLength: number;
}

export function getTextAround(node: ts.Node): IMatch {
  const getLinesAround = (numLines: number) => {
    if (numLines < 2) {
      return 3;
    }
    if (numLines < 4) {
      return 2;
    }
    return 1;
  };

  const sourceFile = node.getSourceFile();
  const sourceCode = sourceFile.getFullText();
  const { line: startLine, character } = ts.getLineAndCharacterOfPosition(
    sourceFile,
    node.getStart(),
  );
  const { line: endLine } = ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd());
  const totalLines = endLine - startLine + 1;
  const linesAround = getLinesAround(totalLines);
  const actualStart = Math.max(0, startLine - linesAround);
  const lines = sourceCode.split('\n');
  return {
    text: lines.slice(actualStart, endLine + 1 + linesAround).join('\n'),
    line: actualStart,
    matchLine: startLine,
    matchChar: character,
    matchLength: node.getEnd() - node.getStart(),
  };
}
