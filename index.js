const express = require("express");
const app = express();
const logger = require("./server/services/loggerService");
const port = process.env.PORT || 5000;
const envValidator = require("./server/services/envValidatorService");
envValidator();
require("./server/services/db");
app.listen(port, () => {
  logger.info(`Server started on : ${port}`);
});
