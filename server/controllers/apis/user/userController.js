const express = require("express");
const userRoutes = express.Router();
const userService = require("../../../services/users/userService");

userRoutes.post("/signup", userService.signup);
userRoutes.post("/login", userService.login);

module.exports = userRoutes;
