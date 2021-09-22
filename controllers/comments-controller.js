const { fetchCommentsByArticleId } = require('../models/comments-model.js')

exports.getCommentsByArticleId = async (req, res, next) => {
    try {
    
    const { article_id } = req.params;
    const commentsByArticleId = await fetchCommentsByArticleId (article_id)    
    res.status(200).send({ commentsByArticleId })
    } catch (err) {
      next (err)  
    }    
}