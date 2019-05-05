const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userRoutes = express.Router();
const userService = require("../../../services/users/userService");

userRoutes.post("/signup", userService.signup);
userRoutes.post("/login", userService.login);

module.exports = userRoutes;
