const { fetchCommentsByArticleId, insertCommentByArticleId } = require('../models/comments-model.js')

exports.getCommentsByArticleId = async (req, res, next) => {
    try {
    
    const { article_id } = req.params;
    const commentsByArticleId = await fetchCommentsByArticleId (article_id)    
    res.status(200).send({ commentsByArticleId })
    } catch (err) {
      next (err)  
    }    
}

exports.postCommentByArticleId = async (req, res, next) => {
    try {
        const { article_id } = req.params
        //console.log(article_id)
        //console.log(req.body)
        const newCommentInfo = req.body;
        const postedComment = await insertCommentByArticleId (article_id, newCommentInfo)
        //console.log(postedComment) 
        res.status(201).send({postedComment})
    } catch (err) {
        next (err)
    }


}