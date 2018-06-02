import * as Bigquery from '@google-cloud/bigquery';
import * as e from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { IMatch } from './search-utils';
import { getSqlQuery } from './sql-query';
import { tsquery } from '@phenomnomnominal/tsquery';

const credentials = require('../bigquery-credentials.json');

const bigquery = Bigquery({
  credentials,
  projectId: credentials.project_id,
});

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const queriesCollection = firestore.collection('queries');

interface IQueryResult {
  id: string;
  paths: string[];
  match: string;
}

interface ICacheEntry {
  query: string;
  time: Date;
  results: IQueryResult[];
}

async function executeQuery(query: string) {
  const [result] = await bigquery.query<IQueryResult>({
    query: getSqlQuery(),
    params: [query],
    maxResults: 10,
  });
  return result;
}

export async function astQuery(request: e.Request, response: e.Response) {
  const { q } = request.query;
  const query = q.trim();
  console.log(`[${request.ip}] Query: ${q}`);
  try {
    tsquery.parse(query);
  } catch (err) {
    response.json({ error: err.toString(), errorKind: 'queryError' });
  }
  try {
    const snapshot = await queriesCollection.where('query', '==', query).get();
    let results: IQueryResult[];
    if (snapshot.docs.length) {
      const cacheEntry = snapshot.docs[0].data() as ICacheEntry;
      results = cacheEntry.results;
    } else {
      const startTime = new Date().getTime();
      results = await executeQuery(query);
      await queriesCollection.add({
        query,
        results,
        time: new Date(),
      } as ICacheEntry);
    }
    response.json({
      results: results.map((entry) => ({
        id: entry.id,
        paths: entry.paths,
        ...(JSON.parse(entry.match) as IMatch),
      })),
    });
  } catch (err) {
    console.error(err);
    response.json({ error: 'Internal server error', errorKind: 'serverError' });
  }
}
