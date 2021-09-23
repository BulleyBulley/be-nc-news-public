const db = require("../db/connection.js");

exports.fetchCommentsByArticleId = async (article_id) => {

    const result = await db.query(
        `SELECT * FROM comments
        WHERE comments.article_id = $1
        `,[article_id]
        )   
        if (result.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        //console.log(result)
        return result.rows
}

exports.insertCommentByArticleId = async (article_id, newCommentInfo) => {
    const { username, body } = newCommentInfo;
    const date = new Date()

    //console.log(body)

    let result = await db.query(
        `INSERT INTO comments (author, article_id, body, created_at) VALUES ($1, $2, $3, $4)
        RETURNING *;`, [username, article_id, body, date]
    )   
    //console.log(result.rows)
        return result.rows[0]

}