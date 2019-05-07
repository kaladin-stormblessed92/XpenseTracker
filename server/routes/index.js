const express = require("express");
const bodyParser = require("body-parser");
const userController = require("../controllers/apis/user/userController");
const errors = require("../middlewares/errorMiddleware");
module.exports = function(app) {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/v1/users", userController);
  app.use(errors);
  app.use("*", (req, res) => {
    res.status("404").send("Not Found..!!");
  });
};
