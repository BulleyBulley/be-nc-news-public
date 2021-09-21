const { showAllTopics} = require('../models/topics.model')

exports.getTopics = (req, res, next) => {
    //console.log(req.query)
    return showAllTopics()
    .then((topics) => {
        res.status(200).send({topics})
    })
}