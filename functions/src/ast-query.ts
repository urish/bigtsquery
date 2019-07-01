import BigQuery = require('@google-cloud/bigquery');
import * as e from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { IMatch } from './search-utils';
import { getSqlQuery, getSqlCount } from './sql-query';
import { tsquery } from '@phenomnomnominal/tsquery';

const credentials = require('../bigquery-credentials.json');

const bigquery = new BigQuery({
  credentials,
  projectId: credentials.project_id,
});

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const queriesCollection = firestore.collection('queries');
const countsCollection = firestore.collection('counts');

interface IQueryResult {
  id: string;
  paths: string[];
  match: string;
}

interface IQueryResultCacheEntry {
  query: string;
  time: Date;
  results: IQueryResult[];
}

async function executeQuery(query: string) {
  const [result] = await bigquery.query<IQueryResult>({
    query: getSqlQuery(),
    params: [query],
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
    console.error(`[${request.ip}] Invalid selector: `, err);
    response.json({ error: err.toString(), errorKind: 'queryError' });
    return;
  }

  try {
    const snapshot = await queriesCollection.where('query', '==', query).get();
    let results: IQueryResult[];
    if (snapshot.docs.length) {
      const cacheEntry = snapshot.docs[0].data() as IQueryResultCacheEntry;
      results = cacheEntry.results;
    } else {
      results = await executeQuery(query);
      await queriesCollection.add({
        query,
        results,
        time: new Date(),
      } as IQueryResultCacheEntry);
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

interface ICountResult {
  count: string | number;
}

interface ICountCacheEntry {
  query: string;
  time: Date;
  count: string | number;
}

async function executeCount(query: string) {
  const [result] = await bigquery.query<ICountResult>({
    query: getSqlCount(),
    params: [query],
  });
  return result;
}

export async function astCount(request: e.Request, response: e.Response) {
  const { q } = request.query;
  const query = q.trim();
  console.log(`[${request.ip}] Query (count): ${q}`);
  try {
    tsquery.parse(query);
  } catch (err) {
    console.error(`[${request.ip}] Invalid selector: `, err);
    response.json({ error: err.toString(), errorKind: 'queryError' });
    return;
  }

  try {
    const snapshot = await countsCollection.where('query', '==', query).get();
    let count: string | number;
    if (snapshot.docs.length) {
      const cacheEntry = snapshot.docs[0].data() as ICountCacheEntry;
      count = cacheEntry.count;
    } else {
      [{ count }] = await executeCount(query);
      await countsCollection.add({
        query,
        count,
        time: new Date(),
      } as ICountCacheEntry);
    }
    response.json({
      count,
    });
  } catch (err) {
    console.error(err);
    response.json({ error: 'Internal server error', errorKind: 'serverError' });
  }
}
