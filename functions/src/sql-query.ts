import * as tsqueryModule from '@phenomnomnominal/tsquery';
import * as searchUtils from './search-utils';

declare const getTextAround: typeof searchUtils.getTextAround;

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
  const { tsquery } = tsqueryModule;
  const source = tsquery.ast(umlCode.toString());
  return searchUtils.getTextAround.toString() + ' ' + tsquery(source, 'Block')[0].getFullText();
}

export function getSqlQuery(limit = 100) {
  return `
    CREATE TEMPORARY FUNCTION getResults(src STRING, query STRING)
    RETURNS ARRAY<STRING>
    LANGUAGE js AS """ ${getUmlCode().replace(/\\/g, '\\\\')} """
    OPTIONS (
      library="gs://bigtsquery/tsquery-1.0.4.umd.min.js"
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
