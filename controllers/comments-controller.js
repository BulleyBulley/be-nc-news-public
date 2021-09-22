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

exports.postCommentsByArticleId = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const newCommentInfo = req.body;
        const postedComment = await insertCommentsByArticleId (article_id, newCommentInfo) 
        res.status(201).send({postedComment})
    } catch (err) {
        next (err)
    }


}