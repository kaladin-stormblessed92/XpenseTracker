const express = require("express");
const bodyParser = require("body-parser");
const userController = require("../controllers/apis/user/userController");
module.exports = function(app) {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(passport.initialize());

  app.use("/v1/users", userController);
  app.use("404", (req, res) => {
    res.status("404").send("Not Found..!!");
  });
};
