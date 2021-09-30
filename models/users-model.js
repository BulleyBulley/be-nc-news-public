const db = require("../db/connection");

exports.fetchUsers = async () => {
  const result = await db.query(`SELECT username FROM users`);
  return result.rows;
};

exports.fetchUserByUsername = async (username) => {
  const result = await db.query(`SELECT * FROM users WHERE username = $1;`, [
    username,
  ]);
  if (result.rows.length === 0) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return result.rows;
};

exports.updateUserNameByUsername = async (username, patchInfo) => {
  const result = await db.query(
    `UPDATE users SET name = $1  
        WHERE username = $2 RETURNING *;`,
    [patchInfo, username]
  );

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Comment Not Found" });
  }
  
  return result.rows[0];
};

exports.updateUserAvatarByUsername = async (username, patchInfo) => {
  const result = await db.query(
    `UPDATE users SET avatar_url = $1  
        WHERE username = $2 RETURNING *;`,
    [patchInfo, username]
  );
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }
  
  return result.rows[0];
};

exports.insertNewUser = async (newUserInfo) => {
  const { username, avatar_url, name } = newUserInfo;

  let result = await db.query(
    `INSERT INTO users (username, avatar_url, name) VALUES ($1, $2, $3)
        RETURNING *;`,
    [username, avatar_url, name]
  );
  
  return result.rows;
};
