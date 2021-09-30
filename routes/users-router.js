const express = require("express");
const {
  getUsers,
  getUserByUsername,
  patchUserByUsername,
  postNewUser
} = require("../controllers/users-controller");
const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter.route("/:username").patch(patchUserByUsername)
usersRouter.route("/").post(postNewUser)


module.exports = usersRouter;
