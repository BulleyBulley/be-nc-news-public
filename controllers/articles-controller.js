const { fetchArticle, updateArticleById, fetchAllArticles } = require('../models/articles.model')

exports.getArticleById = async (req, res, next) => {
    try {
        const { article_id }  = req.params
        const articleItem = await fetchArticle(article_id);
        res.status(200).send({ article: articleItem})
    } catch (err) {
        next(err)
    }
    }
    exports.patchArticleById = (req, res, next) => {
        if (Object.keys(req.body).length > 1) {
            res.status(400).send({ msg:'Bad Request' })
        }
        const { article_id } = req.params;
        const patchInfo  = req.body.inc_votes;
        updateArticleById(article_id, patchInfo).then((updatedArticle) => {
          res.status(200).send({article: updatedArticle});
        })
        .catch((err) => {
            next(err)
        })
        //rewrite using await
      };


exports.getAllArticles = async (req, res, next) => {
    try {
        
        const { sort_by, order, topic } = req.query;
        
        const allArticles = await fetchAllArticles(sort_by, order, topic);
        if (allArticles.length === 0) res.status(404).send({ msg:'Not Found' })
        res.status(200).send({allArticles})
    }  catch (err) {
        next (err)
    }
}



    