import * as e from 'express';
import * as Bigquery from '@google-cloud/bigquery';
import { getSqlQuery } from './sql-query';
import { IMatch } from './search-utils';

const credentials = require('../bigquery-credentials.json');

const bigquery = Bigquery({
  credentials,
  projectId: credentials.project_id,
});

interface IQueryResult {
  id: string;
  paths: string[];
  match: string;
}

export async function astQuery(request: e.Request, response: e.Response) {
  const { q } = request.query;
  console.log(`[${request.ip}] Query: ${q}`);
  try {
    const [result] = await bigquery.query<IQueryResult>({
      query: getSqlQuery(),
      params: [q],
      maxResults: 10,
    });
    response.json(
      result.map((entry) => ({
        id: entry.id,
        paths: entry.paths,
        ...(JSON.parse(entry.match) as IMatch),
      })),
    );
  } catch (err) {
    console.error(err);
    response.json({ error: true });
  }
}
