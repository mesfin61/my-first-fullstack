const { poolPromise, mssql } = require("../config/db");

const profile = async (req, res) => {
  try {
    const pool = await poolPromise;
    const data = await pool
      .request()
      .input("userId", mssql.Int, req.user.id)
      .query("SELECT * FROM userInfo WHERE userId = @userId");

    const result = data.recordset;
    return res.status(200).json({ result });
  } catch (err) {
    console.error({ message: "Internal server error", error: err.message });
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = profile;
