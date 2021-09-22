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

exports.insertCommentsByArticleId = async (article_id, newCommentInfo) => {
    const { park_name, year_opened, annual_attendance } = newPark;

    const result = await db.query(
       
    )


    

    return db
      .query(
        "INSERT INTO parks (park_name, year_opened, annual_attendance) VALUES ($1, $2, $3) RETURNING *;",
        [park_name, year_opened, annual_attendance]
      )
      .then((result) => {
        return result.rows[0];
      });

}