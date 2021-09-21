const { fetchArticle } = require('../models/articles.model')

exports.getArticleById = async (req, res, next) => {
    try {
        const { article_id }  = req.params
        
        const articleItem = await fetchArticle(article_id);
        res.status(200).send({ article: articleItem})
    } catch (err) {
        next(err)
    }
    }