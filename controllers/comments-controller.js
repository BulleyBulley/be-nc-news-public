const {
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  removeCommentByCommentId,
  updateCommentById
} = require("../models/comments-model.js");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const commentsByArticleId = await fetchCommentsByArticleId(article_id);
    res.status(200).send({ commentsByArticleId });
  } catch (err) {
    next(err);
  }
};

exports.postCommentByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const newCommentInfo = req.body;
    const postedComment = await insertCommentByArticleId(
      article_id,
      newCommentInfo
    );
    res.status(201).send({ postedComment });
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentByCommentId = async (req, res, next) => {
  try {
    const { comment_id } = req.params
    //console.log(req)
    const deletedComment = await removeCommentByCommentId(comment_id)
  
    res.status(204).send()
  
  } catch (err) {
    next (err);
  }
}

exports.patchCommentById = (req, res, next) => {
  if (Object.keys(req.body).length > 1) {
    res.status(400).send({ msg: "Bad Request" });
  }
  const { comment_id } = req.params;
  const patchInfo = req.body.inc_votes;
  updateCommentById(comment_id, patchInfo)
    .then((updatedComment) => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch((err) => {
      next(err);
    });
};
