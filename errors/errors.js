exports.handlePSQL400Errors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502" || err.code === "23503" || err.code === "42703" || err.code === "42601") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
  console.log(err, "<-----500 error at bottom of page");
};
