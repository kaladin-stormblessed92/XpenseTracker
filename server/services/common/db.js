const mongoose = require("mongoose");
const logger = require("./loggerService");
const config = require("config");

const userName =
  process.env.NODE_ENV === "test"
    ? config.get("TESTDB.Username")
    : config.get("DB.Username");

const password =
  process.env.NODE_ENV === "test"
    ? config.get("TESTDB.Password")
    : config.get("DB.Password");

const url =
  `mongodb://${userName}:${password}@` +
  `${config.get("DB.Host")}:${config.get("DB.Port")}/` +
  `${config.get("DB.Database")}`;

console.log(url);
mongoose.connect(url, error => {
  if (error) {
    logger.error(`${error.code} - ${error.message}`);
  } else {
    logger.info("Connected Successfully to Database.");
  }
});
