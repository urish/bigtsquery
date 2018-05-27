import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root',
})
export class AstSearchService {
  constructor(private http: HttpClient) {}

  search(query: string) {
    const q = encodeURIComponent(query);
    return this.http.get<IQueryResult[]>(`${serverUrl}/query?q=${q}`);
  }
}
