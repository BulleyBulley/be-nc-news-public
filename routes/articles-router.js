const express = require("express");
const articlesRouter = express.Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postNewArticle,
  deleteArticleById
} = require("../controllers/articles-controller");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/comments-controller");
articlesRouter.route("/").get(getAllArticles);
articlesRouter.route("/:article_id").get(getArticleById);
articlesRouter.route("/:article_id/comments").get(getCommentsByArticleId);
articlesRouter.route("/:article_id").patch(patchArticleById);
articlesRouter.route("/:article_id/comments").post(postCommentByArticleId);
articlesRouter.route("/:article_id").delete(deleteArticleById)
articlesRouter.route("/").post(postNewArticle);

module.exports = articlesRouter;
