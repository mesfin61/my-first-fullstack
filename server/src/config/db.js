const mssql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    instanceName: "SQLEXPRESS",
    encrypt: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new mssql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("connected to database successfully");
    return pool;
  })
  .catch((err) => {
    console.error("database connection failed:", err);
  });

module.exports = {
  mssql,
  poolPromise,
};
