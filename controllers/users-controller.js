const { fetchUsers } = require ("../models/users-model.js")

exports.getUsers = async (req, res, next) => {
    try {
      const allUsers = await fetchUsers();
      res.status(200).send({ allUsers });
      console.log(allUsers)
    } catch (err) {
      next(err);
    }
  };