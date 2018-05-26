Run the following query to generate `src/dataset.json`: 

```sql
SELECT
  contents.id,
  content,
  ARRAY_AGG(CONCAT(repo_name, REPLACE(ref, 'refs/heads/', '/blob/'), '/', path)) AS paths
FROM
  typescript.tscontents AS contents
JOIN
  typescript.tsfiles AS files
ON
  contents.id = files.id
WHERE
  size >= 1000
GROUP BY
  contents.id,
  content,
  size
ORDER BY
  size
LIMIT
  10000
```