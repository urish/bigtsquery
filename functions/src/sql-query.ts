import * as tsqueryModule from '@phenomnomnominal/tsquery';
import * as searchUtils from './search-utils';

// NOTE: cannot use import as it becomes qualified in commonJS transpiled output.
const getTextAround = searchUtils.getTextAround;

function umlCode(this: { tsquery: typeof tsqueryModule }, src: string, query: string) {
  const { tsquery } = this.tsquery;
  try {
    const sourceFile = tsquery.ast(src);
    const results = tsquery(sourceFile, query);
    return results.map((item) => JSON.stringify(getTextAround(item)));
  } catch (err) {
    return [];
  }
}

export function getUmlCode() {
  return `
    ${getTextAround}
    ${umlCode}
    return umlCode.call(this, src, query);`;
}

export function getSqlQuery(limit = 100) {
  return `
    CREATE TEMPORARY FUNCTION getResults(src STRING, query STRING)
    RETURNS ARRAY<STRING>
    LANGUAGE js AS """ ${getUmlCode().replace(/\\/g, '\\\\')} """
    OPTIONS (
      library="gs://bigtsquery/tsquery-2.0.0-beta.4.umd.min.js"
    );

    SELECT
      id,
      paths,
      match
    FROM
      typescript.tscontents_fast,
      UNNEST(getResults(content, ?)) AS match
    LIMIT
      ${limit}
  `;
}

function umlCodeCount(this: { tsquery: typeof tsqueryModule }, src: string, query: string) {
  const { tsquery } = this.tsquery;
  try {
    const sourceFile = tsquery.ast(src);
    const results = tsquery(sourceFile, query);
    return [results.length];
  } catch (err) {
    return [];
  }
}

export function getUmlCodeCount() {
  return `
    ${getTextAround}
    ${umlCodeCount}
    return umlCodeCount.call(this, src, query);`;
}

export function getSqlCount() {
  return `
    CREATE TEMPORARY FUNCTION getCount(src STRING, query STRING)
    RETURNS ARRAY<INT64>
    LANGUAGE js AS """ ${getUmlCodeCount().replace(/\\/g, '\\\\')} """
    OPTIONS (
      library="gs://bigtsquery/tsquery-2.0.0-beta.4.umd.min.js"
    );

    SELECT
      sum(match_count) as count
    FROM
      typescript.tscontents_fast,
      UNNEST(getCount(content, ?)) AS match_count
  `;
}
