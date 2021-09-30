const db = require("../db/connection");

exports.showAllTopics = () => {
  let queryStr = `SELECT * FROM topics;`;
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.insertNewTopic = async (newTopicInfo) => {
  const { slug, description } = newTopicInfo;

  let result = await db.query(
    `INSERT INTO topics (slug, description) VALUES ($1, $2)
        RETURNING *;`,
    [slug, description]
  );

  return result.rows[0];
};
