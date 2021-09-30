const { fetchUsers, fetchUserByUsername, updateUserNameByUsername, updateUserAvatarByUsername, insertNewUser } = require ("../models/users-model.js")

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

  exports.patchUserByUsername = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length > 1) {
      res.status(400).send({ msg: "Bad Request" });
    }
      const { username } = req.params;
      let patchInfo = req.body.name;
      
      if (req.body.avatar_url) {
        patchInfo = req.body.avatar_url
       
      const updatedUser = await updateUserAvatarByUsername(username, patchInfo);
      res.status(200).send({ user: updatedUser });
      } else {
      const updatedUser = await updateUserNameByUsername(username, patchInfo);
      res.status(200).send({ user: updatedUser });
      }
    } catch (err) {
      next (err)
    }
  }

  exports.postNewUser = async (req, res, next) => {
    try {
      const newUserInfo = req.body;
      const newUser = await insertNewUser(newUserInfo);
      res.status(201).send({ newUser });
      
    } catch (err) {
      
      next(err);
    }
  };