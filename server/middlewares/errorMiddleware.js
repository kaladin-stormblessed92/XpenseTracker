const logger = require("../services/common/loggerService");

module.exports = function(err, req, res, next) {
  if (err) {
    logger.error(
      `${err.status || 500} - ${
        typeof err === "string" ? err : err.message
      } - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res
      .status(500)
      .send(
        req.app.get("env") === "development"
          ? typeof err === "string"
            ? err
            : err.message
          : "something went wrong."
      );
  }
  next();
};
