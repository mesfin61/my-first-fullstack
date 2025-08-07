const { poolPromise, mssql } = require("../config/db");
const deleteAccount = async (req, res) => {
  try {
    const pool = await poolPromise;
    const data = await pool
      .request()
      .input("userId", mssql.Int, req.user.id)
      .query(`SELECT * FROM userInfo WHERE userId = @userId`);

    if (data.recordset.length === 0) {
      return res.status(401).json({ message: "user account not found" });
    }

    await pool
      .request()
      .input("userId", mssql.Int, req.user.id)
      .query(`DELETE FROM userInfo WHERE userId = @userId`);

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);

    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = deleteAccount;
