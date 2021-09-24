const db = require("../db/connection");

exports.fetchArticle = async (article_id) => {
  const result = await db.query(
    `SELECT articles.*, COUNT(comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`,
    [article_id]
  );
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Article Not Found" });
  }
  return result.rows;
};

exports.updateArticleById = (article_id, patchInfo) => {
  return db
    .query(
      `UPDATE articles SET votes = $1 + votes WHERE article_id = $2 RETURNING *;`,
      [patchInfo, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      if (result.rows[0].votes === null) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }
      return result.rows;
    });
};

exports.fetchAllArticles = async (sort_by = "created_at", order = "DESC", topic, limit = 10, p = 1) => {
  const offset = (p - 1) * limit;
  const queryValues = [];
  let queryStr = `
    SELECT articles.*, COUNT(comment_id) 
    AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id`;

  if (topic) {
    queryValues.push(topic);
    queryStr += ` HAVING articles.topic = $1`;
  }

  queryStr += ` ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${offset};`;

  const result = await db.query(queryStr, queryValues);
  //console.log(result.rows)
  return result.rows;


  //add total count property?
};
