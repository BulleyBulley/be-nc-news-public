const db = require("../db/connection");

exports.fetchArticle = async (article_id) => {
    const commentsWithId = await db.query(
      "SELECT * FROM comments WHERE article_id = $1;",
      [article_id]
    );
    const result = await db.query(
      "SELECT * FROM articles WHERE article_id = $1;",
      [article_id]
    );
      if(result.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Article Not Found"})
      }
    let articleRequest = result.rows;
    articleRequest[0].comment_count = commentsWithId.rows.length;
    return articleRequest;
  };

  exports.updateArticleById = (article_id, patchInfo) => {
    //console.log(patchInfo)
    return db
      .query(
        `UPDATE articles SET votes = $1 + votes WHERE article_id = $2 RETURNING *;`,
        [patchInfo, article_id]
      )
      .then((result) => {
        //console.log(result.rows[0])
        return result.rows[0];
      });
  }; 