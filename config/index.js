const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL
};
