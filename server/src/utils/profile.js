const pool = require("../config/db");

const profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query("SELECT * FROM userInfo WHERE userId = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ result: rows });
  } catch (err) {
    console.error({ message: "Internal server error", error: err.message });
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = profile;
