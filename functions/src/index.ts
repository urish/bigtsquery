import * as functions from 'firebase-functions';
import { tsquery } from '@phenomnomnominal/tsquery';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const maxResults = 100;

interface IResult {
  id: string;
  text: string;
  start: number;
  end: number;
}

export const query = functions.https.onRequest((request, response) => {
  const { q } = request.query;
  const lineReader = createInterface({
    input: createReadStream('src/dataset.json'),
  });
  const results: IResult[] = [];
  lineReader.on('line', (line) => {
    if (results.length > maxResults) {
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
        if (results.length > maxResults) {
          break;
        }
      }
    } catch (err) {}
  });
  lineReader.on('close', () => {
    response.json(results);
  });
});
