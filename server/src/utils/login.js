const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { poolPromise, mssql } = require("../config/db");
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
    return res.status(400).json({ message: "all fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", mssql.VarChar, email)
      .query("select * from userInfo where email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid email or password" });
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
    return res.status(500).json({ message: `internal server error ` });
  }
};

module.exports = {
  loginLimitter,
  login,
};
