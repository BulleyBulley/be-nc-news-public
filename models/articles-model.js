const db = require("../db/connection");
const { checkSortByExists,checkOrderExists } = require("../db/utils/data-manipulation");

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
    return result.rows[0];
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

exports.fetchAllArticles = async (sort_by, order, topic, limit = 10, p = 1) => {
  const offset = (p - 1) * limit;
  const queryValues = [limit, offset];
  const checkedSortBy = await checkSortByExists(sort_by)
  const checkedOrder = await checkOrderExists(order)
  let queryStr = `
  SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, COUNT(comment_id) 
  AS comment_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id`;
 

  if (topic) {
    queryValues.push(topic);
    queryStr += ` HAVING articles.topic = $3`;
  }
  
  queryStr += ` ORDER BY ${checkedSortBy} ${checkedOrder} LIMIT $1 OFFSET $2;`; 
  //queryStr += ` ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${offset};`;

  const result = await db.query(queryStr, queryValues);
  
  return result.rows;


  //add total count property
};
