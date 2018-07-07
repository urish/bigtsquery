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
  AND repo_name != 'georgringer/TYPO3.base' -- See https://github.com/urish/bigtsquery/issues/6
