const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
  connectTimeout: 20000,
});

// Test connection
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ Connected to MySQL database successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL database connection failed:", err);
  });

module.exports = pool;
