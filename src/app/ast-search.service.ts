import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// for localhost: http://localhost:5000/bigtsquery/us-central1
const serverUrl = `https://us-central1-bigtsquery.cloudfunctions.net/`;

export interface IASTQueryMatch {
  text: string;
  line: number;
  matchLine: number;
  matchChar: number;
  matchLength: number;
}

export interface IQueryResult extends IASTQueryMatch {
  id: string;
  paths: string[];
}

export type IQueryErrorKind = 'queryError' | 'serverError';

export interface IQueryResponse {
  results?: IQueryResponse[];
  error?: string;
  errorKind?: IQueryErrorKind;
}

@Injectable({
  providedIn: 'root',
})
export class AstSearchService {
  constructor(private http: HttpClient) {}

  search(query: string) {
    const q = encodeURIComponent(query);
    return this.http.get<IQueryResponse>(`${serverUrl}/query?q=${q}`);
  }
}
