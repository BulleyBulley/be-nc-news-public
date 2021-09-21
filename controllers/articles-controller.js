const { path } = require('../app');
const { fetchArticle, updateArticleById } = require('../models/articles.model')

exports.getArticleById = async (req, res, next) => {
    try {
        const { article_id }  = req.params
        const articleItem = await fetchArticle(article_id);
        res.status(200).send({ article: articleItem})
    } catch (err) {
        next(err)
    }
    }
    exports.patchArticleById = (req, res) => {
        const article_id = req.params.article_id;
        const patchInfo  = req.body.inc_votes;
        //console.log(req.body)
        //console.log(patchInfo)
      
        updateArticleById(article_id, patchInfo).then((updatedArticle) => {
            console.log(updatedArticle)
          res.status(200).send(updatedArticle);
        });
      };



    