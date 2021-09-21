const db = require("../db/connection");

exports.showAllTopics = () => {
  let queryStr = `SELECT * FROM topics;`;
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};


