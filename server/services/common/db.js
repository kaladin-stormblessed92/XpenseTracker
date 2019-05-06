const mongoose = require("mongoose");
const logger = require("./loggerService");
const config = require("config");

let mongoUserURL = "";
if (process.env.NODE_ENV === "test") {
  if (config.has("TESTDB.Username")) {
    mongoUserURL = config.get("TESTDB.Username");
  }
  if (config.has("TESTDB.Password")) {
    mongoUserURL += ":" + config.get("TESTDB.Password");
  }
  if (mongoUserURL.length > 0) {
    mongoUserURL += "@";
  }
} else {
  if (config.has("DB.Username")) {
    mongoUserURL = config.get("DB.Username");
  }
  if (config.has("DB.Password")) {
    mongoUserURL += ":" + config.get("DB.Password");
  }
  if (mongoUserURL.length > 0) {
    mongoUserURL += "@";
  }
}

const url =
  `mongodb://${mongoUserURL}` +
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
