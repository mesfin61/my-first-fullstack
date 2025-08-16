const pool = require("../config/db"); // MySQL pool

const account = async (req, res) => {
  const { first_name, last_name, username, email, phone_number } = req.body;

  if (!first_name || !last_name || !username || !email || !phone_number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    // 1️⃣ Check if email is used by another account
    const [emailCheck] = await pool.query(
      "SELECT * FROM userInfo WHERE email = ? AND userId != ?",
      [email, req.user.id]
    );

    if (emailCheck.length > 0) {
      return res
        .status(409)
        .json({ message: "Email already in use by another account" });
    }

    // 2️⃣ Update user information
    const [result] = await pool.query(
      `UPDATE userInfo
       SET first_name = ?, last_name = ?, username = ?, email = ?, phone_number = ?
       WHERE userId = ?`,
      [first_name, last_name, username, email, phone_number, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Update successful" });
  } catch (err) {
    console.error("Error updating account:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = account;
