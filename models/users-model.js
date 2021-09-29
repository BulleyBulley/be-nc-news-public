const db = require("../db/connection");

exports.fetchUsers = async () => {
    const result = await db.query (
        `SELECT username FROM users`
    )
    return result.rows
}

exports.fetchUserByUsername = async (username) => {
    const result = await db.query (
        `SELECT * FROM users WHERE username = $1;`,[username]
    )
    if (result.rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }    

    return result.rows
}

exports.updateUserNameByUsername = async (username, patchInfo) => {
    return db
    .query(
      `UPDATE users SET name = $1  
      WHERE username = $2 RETURNING *;`,
      [patchInfo, username]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found" });
      }
      if (result.rows[0].votes === null) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }

      return result.rows[0];
    });

    
}

exports.updateUserAvatarByUsername = async (username, patchInfo) => {
    return db
    .query(
      `UPDATE users SET avatar_url = $1  
      WHERE username = $2 RETURNING *;`,
      [patchInfo, username]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found" });
      }
      if (result.rows[0].votes === null) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }

      return result.rows[0];
    });
}