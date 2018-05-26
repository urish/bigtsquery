import { tsquery } from '@phenomnomnominal/tsquery';
import * as e from 'express';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const maxResults = 100;

interface IQueryResult {
  id: string;
  text: string;
  start: number;
  end: number;
}

export function astQuery(request: e.Request, response: e.Response) {
  const { q } = request.query;
  const lineReader = createInterface({
    input: createReadStream('src/dataset.json'),
  });
  const results: IQueryResult[] = [];
  lineReader.on('line', (line) => {
    if (results.length >= maxResults) {
      return;
    }
    const { id, content } = JSON.parse(line);
    const sourceFile = tsquery.ast(content);
    try {
      for (const result of tsquery(sourceFile, q)) {
        results.push({
          id,
          text: result.getText(),
          start: result.getStart(),
          end: result.getEnd(),
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
