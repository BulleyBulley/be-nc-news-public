const db = require('../connection')
//const format = require("pg-format")

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
  .query('DROP TABLE IF EXISTS topics CASCADE;')
  .then (() => {
    return db.query('DROP TABLE IF EXISTS users CASCADE;')
  })
  .then (() => {
    return db.query('DROP TABLE IF EXISTS articles CASCADE;')
  })
  .then (() => {
    return db.query('DROP TABLE IF EXISTS comments CASCADE;')
  })
  .then (() => {
    console.log('All tables dropped')
  })
  .then(() => {
    return db.query(`
    CREATE TABLE topics (
      slug SERIAL PRIMARY KEY,
      description VARCHAR(500)
    );`)
  })
  .then(() => {
    return db.query(`
    CREATE TABLE users (
      username VARCHAR(50) PRIMARY KEY,
      avatar_url VARCHAR(300),
      name VARCHAR(200) NOT NULL
    );`)
  })
  .then(() => {
   return db.query(`
   CREATE TABLE articles (
     article_id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      topic INT REFERENCES topics(slug) ON DELETE CASCADE,
      author VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE,
      created_at TIMESTAMP
   );`) 
  })
  .then (() => {
    return db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
      article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
      votes INT DEFAULT 0,
      created_at TIMESTAMP,
      body VARCHAR(500)
    );`)
  })
  .then(() => {
    console.log('All tables created')
  })
  


};

module.exports = seed;
