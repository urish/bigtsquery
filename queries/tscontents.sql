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
    `bigquery-public-data.github_repos.files`
  WHERE
    path LIKE '%.ts')
  AND binary = FALSE
  AND NOT STARTS_WITH(content, '<')
