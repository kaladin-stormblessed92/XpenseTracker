const express = require("express");
const app = express();
const logger = require("./server/services/common/loggerService");
const port = process.env.PORT || 5000;
const passport = require("passport");
passport.initialize();
require("./server/services/common/db");
require("./server/services/common/authService");
require("./server/routes/index")(app);

app.listen(port, () => {
  logger.info(`Server started on : ${port}`);
});
