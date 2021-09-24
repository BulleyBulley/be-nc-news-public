const express = require("express");
const apiRouter = express.Router();
const { getTopics } = require("../controllers/topics-controller.js");
const { getArticleById, patchArticleById, getAllArticles,} = require("../controllers/articles-controller.js");
const { getCommentsByArticleId, postCommentByArticleId,deleteCommentByCommentId, patchCommentById} = require("../controllers/comments-controller.js");

const { getUsers, getUserByUsername } = require("../controllers/users-controller.js")

const { getEndpoints } = require("../controllers/endpoints-controller.js");

apiRouter.get("/", getEndpoints);

apiRouter.get("/topics", getTopics);
apiRouter.get("/articles", getAllArticles);
apiRouter.get("/articles/:article_id", getArticleById);
apiRouter.get("/articles/:article_id/comments", getCommentsByArticleId);
apiRouter.get("/users", getUsers)
apiRouter.get("/users/:username", getUserByUsername)

apiRouter.patch("/articles/:article_id", patchArticleById);
apiRouter.patch("/comments/:comment_id", patchCommentById);
apiRouter.post("/articles/:article_id/comments", postCommentByArticleId);

apiRouter.delete("/comments/:comment_id", deleteCommentByCommentId);

module.exports = apiRouter;
