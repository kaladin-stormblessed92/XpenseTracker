const winston = require("winston");
const config = require("config");
require("winston-daily-rotate-file");
const fs = require("fs");

const logDir = config.get("Logs.Path");
const exceptionLogDir = config.get("Logs.Exceptionpath");

const FILE_LOG_LEVEL = config.has("FILE_LOG_LEVEL")
  ? config.get("FILE_LOG_LEVEL")
  : "debug";

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: "YYYY-MM-DD"
});
const dailyRotateunCaughtExceptionFileTransport = new winston.transports.DailyRotateFile(
  {
    filename: `${exceptionLogDir}/%DATE%-Exceptions.log`,
    datePattern: "YYYY-MM-DD"
  }
);
const options = {
  console: {
    level: FILE_LOG_LEVEL,
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}  `
    )
  ),
  transports: [dailyRotateFileTransport],
  exceptionHandlers: [dailyRotateunCaughtExceptionFileTransport],
  exitOnError: false
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console(options.console));
}

process.on("unhandeledRejections", ex => {
  throw ex;
});

module.exports = logger;
