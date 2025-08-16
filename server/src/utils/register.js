const pool = require("../config/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
    confirmPassword,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !phone_number ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [existingUser] = await pool.query(
      "SELECT * FROM userInfo WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    await pool.query(
      `INSERT INTO userInfo 
      (first_name, last_name, username, email, phone_number, password) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, username, email, phone_number, hashedPassword]
    );

    return res.status(200).json({ message: "Sign up successfully" });
  } catch (err) {
    console.error("Error in register:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = register;
