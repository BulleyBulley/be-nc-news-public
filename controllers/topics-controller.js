const { showAllTopics, insertNewTopic } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  return showAllTopics()
    .then((topics) => {
      if (topics) {
        res.status(200).send({ topics });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewTopic = async (req, res, next) => {
  try {
    const newTopicInfo = req.body;
    const newTopic = await insertNewTopic(newTopicInfo);
    res.status(201).send({ newTopic });
  } catch (err) {
    next(err);
  }
};
