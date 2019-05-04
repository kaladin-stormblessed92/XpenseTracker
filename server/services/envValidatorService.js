const config = require("config");

module.exports = () => {
  const env = process.env.NODE_ENV || "development";
  if (
    env !== "test" &&
    (!config.has("DB.Password") || !config.has("DB.Username"))
  ) {
    throw new Error(
      "Database configuration is not set properly.Please check your environment variables."
    );
  } else if (
    env === "test" &&
    (!config.has("TESTDB.Password") || !config.has("TESTDB.Username"))
  ) {
    throw new Error(
      "Test Database configuration is not set properly.Please check your environment variables."
    );
  }
};
