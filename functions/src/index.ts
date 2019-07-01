import * as functions from 'firebase-functions';
import { astQuery, astCount } from './ast-query';
import { corsHandler } from './cors';

export const query = functions.https.onRequest(corsHandler(astQuery));
export const count = functions.https.onRequest(corsHandler(astCount));
