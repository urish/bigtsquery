#standardSQL
SELECT
  *
FROM
  `bigquery-public-data.github_repos.contents`
WHERE
  id IN (
  SELECT
    id
  FROM
    `typescript.tsfiles`)
  AND binary = FALSE
  AND NOT STARTS_WITH(content, '<')
