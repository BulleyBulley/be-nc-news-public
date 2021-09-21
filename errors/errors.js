

exports.handle500Errors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
    console.log(err, "<-----500 error at bottom of page");
  };