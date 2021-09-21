const express = require('express');
const apiRouter = express.Router();
const { getTopics, getArticleById } = require('../controllers/topics-controller.js')

apiRouter.get('/', (req, res) => {
    res.status(200).send({ msg: 'Connection Success'})
})

apiRouter.get('/topics', getTopics)

apiRouter.get('/articles/:article_id', getArticleById)

module.exports = apiRouter;