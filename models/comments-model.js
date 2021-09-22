const db = require("../db/connection.js");

exports.fetchCommentsByArticleId = async (article_id) => {

    const result = await db.query(
        `SELECT * FROM comments
        WHERE comments.article_id = $1
        `,[article_id]
    )   
        return result.rows
}