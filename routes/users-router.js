const express = require("express");
const {
  getUsers,
  getUserByUsername,
  patchUserByUsername
} = require("../controllers/users-controller");
const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter.route("/:username").patch(patchUserByUsername)


module.exports = usersRouter;
