const db = require('../connection')
const format = require("pg-format");
const { formatTopicsData, formatUsersData, formatArticlesData, formatCommentsData, createSlugRef } = require ("../utils/data-manipulation.js")



//const promise1 = []

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
      slug VARCHAR(100) PRIMARY KEY,
      description VARCHAR(500)
    );`)
  })
  .then(() => {
    return db.query(`
    CREATE TABLE users (
      username VARCHAR(100) PRIMARY KEY,
      avatar_url VARCHAR(300),
      name TEXT NOT NULL
    );`)
  })
  .then(() => {
   return db.query(`
   CREATE TABLE articles (
     article_id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      topic VARCHAR(200) REFERENCES topics(slug) ON DELETE CASCADE,
      author VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
      created_at TEXT
   );`) 
  })
  .then (() => {
    return db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
      article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
      votes INT DEFAULT 0,
      created_at DATE,
      body TEXT
    );`)
  })
  .then(() => {
    console.log('All tables created')
  })
  .then (() => {
    const queryStr = format (
    `INSERT INTO topics
    (slug, description)
    VALUES
    %L
    RETURNING *;
    `,
    formatTopicsData(topicData)
    );
    return db.query(queryStr) 
  })
  .then(() => {
    const queryStr = format (
      ` INSERT INTO users
      (username, avatar_url, name)
      VALUES
      %L
      RETURNING *;
      `,
      formatUsersData(userData)
    );
    return db.query(queryStr)
  })
  .then (() => {
    //console.log(topicData.rows)
    //const slugRef = createSlugRef(result)
    const queryStr = format (
    `
    INSERT INTO articles
    (title, topic, author, body, created_at, votes)
    VALUES
    %L
    RETURNING *;
    `,
    formatArticlesData(articleData)
  );
  return db.query(queryStr)  
  })
  .then (() => {
  const queryStr = format (
    `
    INSERT INTO comments
    (body, votes, author, article_id, created_at)
    VALUES
    %L
    RETURNING *;
    `,
    formatCommentsData(commentData)
  )  
  return db.query(queryStr) 
  })
  .then (() => {
    console.log('All tables seeded')
      })

  

  


};

module.exports = seed;
