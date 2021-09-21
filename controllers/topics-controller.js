const { showAllTopics, fetchArticle } = require('../models/topics.model')

exports.getTopics = (req, res, next) => {
    //console.log(req.query)
    return showAllTopics()
    .then((topics) => {
        if (topics) {
        res.status(200).send({topics})
        } else {
        return Promise.reject({ status: 404, msg: "Not found" });
        }
    })
    .catch((err) => {
        next(err);
    })
}

exports.getArticleById = async (req, res, next) => {
try {
    const { article_id }  = req.params
    
    const articleItem = await fetchArticle(article_id);
    res.status(200).send({ article: articleItem})
} catch (err) {
    next(err)
}
}