const db = require("../db/connection");

exports.showAllTopics = () => {
  let queryStr = `SELECT * FROM topics;`;
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.fetchArticle = async (article_id) => {
  const commentsWithId = await db.query(
    "SELECT * FROM comments WHERE article_id = $1;",
    [article_id]
  );
  const result = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [article_id]
  );
  let articleRequest = result.rows;
  articleRequest[0].comment_count = commentsWithId.rows.length;
  return articleRequest;
};
