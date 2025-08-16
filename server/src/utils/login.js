const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const rateLimit = require("express-rate-limit");

const loginLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM userInfo WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user.userId,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "login successfully", token });
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginLimitter,
  login,
};
