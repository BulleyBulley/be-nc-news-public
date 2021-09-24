const { fetchUsers, fetchUserByUsername } = require ("../models/users-model.js")

exports.getUsers = async (req, res, next) => {
    try {
      const allUsers = await fetchUsers();
      res.status(200).send({ allUsers });
    } catch (err) {
      next(err);
    }
  };

  exports.getUserByUsername = async (req, res, next ) => {
     try {
        const {username} = req.params;
        const user = await fetchUserByUsername(username);
        res.status(200).send({user})
     } catch(err) {
         next (err)
     }
  }