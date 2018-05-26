import { tsquery } from '@phenomnomnominal/tsquery';
import * as e from 'express';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { getTextAround } from './search-utils';

const maxResults = 100;

interface IQueryResult {
  id: string;
  text: string;
  line: number;
  matchLine: number;
  matchChar: number;
  matchLength: number;
}

export function astQuery(request: e.Request, response: e.Response) {
  const { q } = request.query;
  const lineReader = createInterface({
    input: createReadStream('src/dataset.json'),
  });
  const results: IQueryResult[] = [];
  lineReader.on('line', (datasetEntry) => {
    if (results.length >= maxResults) {
      return;
    }
    const { id, content } = JSON.parse(datasetEntry);
    const sourceFile = tsquery.ast(content);
    try {
      for (const node of tsquery(sourceFile, q)) {
        results.push({
          id,
          ...getTextAround(node),
        });
        if (results.length >= maxResults) {
          break;
        }
      }
    } catch (err) {}
  });
  lineReader.on('close', () => {
    response.json(results);
  });
}
