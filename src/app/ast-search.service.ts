import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// for localhost: http://localhost:5000/bigtsquery/us-central1
const serverUrl = `https://us-central1-bigtsquery.cloudfunctions.net/`;

export interface IQueryResult {
  text: string;
  line: number;
  matchLine: number;
  matchChar: number;
  matchLength: number;
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
