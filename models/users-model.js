const db = require("../db/connection");

exports.fetchUsers = async () => {
    const result = await db.query (
        `SELECT username FROM users`
    )
    return result.rows
}

exports.fetchUserByUsername = async (username) => {
    //console.log(usernameReq)
    const result = await db.query (
        `SELECT * FROM users WHERE username = $1;`,[username]
    )
    return result.rows
}