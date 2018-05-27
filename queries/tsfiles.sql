#standardSQL
SELECT
  id,
  repo_name,
  path,
  ref
FROM
  `bigquery-public-data.github_repos.files`
WHERE
  path LIKE '%.ts'
