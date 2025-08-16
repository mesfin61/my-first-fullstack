const bcrypt = require("bcrypt");
const pool = require("../config/db");

const password = async (req, res) => {
  const { password, new_password, confirm_password } = req.body;

  if (!password || !new_password || !confirm_password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [rows] = await pool.query("SELECT * FROM userInfo WHERE userId = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await pool.query("UPDATE userInfo SET password = ? WHERE userId = ?", [
      hashedPassword,
      userId,
    ]);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = password;
