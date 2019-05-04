const logger = require("./server/services/loggerService");

module.exports = function(err, req, res, next) {
  if (err) {
    logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    res
      .status(500)
      .send(
        req.app.get("env") === "development"
          ? err.message
          : "something went wrong."
      );
  }
  next();
};
