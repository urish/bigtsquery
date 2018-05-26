import * as cors from 'cors';
import * as e from 'express';

const corsInstance = cors({
  origin: ['https://tsqueryapp.firebaseapp.com', 'http://localhost:4200'],
});

type FirebaseHandler = (req: e.Request, res: e.Response) => void;

export function corsHandler(callback: FirebaseHandler) {
  return (req: e.Request, res: e.Response) => corsInstance(req, res, () => callback(req, res));
}
