const express = require("express");
const topicsRouter = express.Router();
const { getTopics, postNewTopic } = require("../controllers/topics-controller");

topicsRouter.route("/").get(getTopics);
topicsRouter.route("/").post(postNewTopic);

module.exports = topicsRouter;
