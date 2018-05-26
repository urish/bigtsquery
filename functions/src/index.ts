import * as functions from 'firebase-functions';
import { astQuery } from './ast-query';
import { corsHandler } from './cors';

export const query = functions.https.onRequest(corsHandler(astQuery));
