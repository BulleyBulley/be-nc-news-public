const express = require('express');
const apiRouter = express.Router();
const { getTopics } = require('../controllers/topics-controller.js')

apiRouter.get('/', (req, res) => {
    res.status(200).send({ msg: 'Connection Success'})
})

apiRouter.get('/topics', getTopics)

module.exports = apiRouter;