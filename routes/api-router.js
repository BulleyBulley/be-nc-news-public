const express = require('express');
const apiRouter = express.Router();
const { getTopics } = require('../controllers/topics-controller.js')
const { getArticleById, patchArticleById, getAllArticles } = require('../controllers/articles-controller.js')
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentByCommentId } = require('../controllers/comments-controller.js')
const { getEndpoints } = require('../controllers/endpoints-controller.js')

apiRouter.get('/', getEndpoints)
    
    //res.status(200).send({ msg: 'Connection Success'})


apiRouter.get('/topics', getTopics)
apiRouter.get('/articles', getAllArticles)
apiRouter.get('/articles/:article_id', getArticleById)
apiRouter.patch('/articles/:article_id', patchArticleById)
apiRouter.post('/articles/:article_id/comments', postCommentByArticleId)
apiRouter.get('/articles/:article_id/comments', getCommentsByArticleId)
apiRouter.delete('/comments/:comment_id', deleteCommentByCommentId)

module.exports = apiRouter;