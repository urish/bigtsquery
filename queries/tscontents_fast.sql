#standardSQL
SELECT
  *,
  repeat(content,
    40) AS _dummy
FROM
  `typescript.tscontents`
JOIN (
  SELECT
    id AS files_id,
    ARRAY_AGG(CONCAT(repo_name, REPLACE(ref, 'refs/heads/', '/blob/'), '/', path)) AS paths
  FROM
    `typescript.tsfiles`
  GROUP BY
    id) AS files
ON
  id = files_id
WHERE
  size <= 10000
