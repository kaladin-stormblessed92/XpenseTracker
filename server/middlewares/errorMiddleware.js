const logger = require("../services/common/loggerService");

module.exports = function(err, req, res, next) {
  if (err) {
    const errorMessage = typeof err === "string" ? err : err.message;
    logger.error(
      `${err.status || 500} - ${errorMessage} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );

    res.status(500).send({ message: errorMessage });
  }
  next();
};
