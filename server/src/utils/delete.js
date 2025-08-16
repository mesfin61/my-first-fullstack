const pool = require("../config/db");

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(`SELECT * FROM userInfo WHERE userId = ?`, [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "user account not found" });
    }

    await pool.query(`DELETE FROM userInfo WHERE userId = ?`, [userId]);
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);

    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = deleteAccount;
