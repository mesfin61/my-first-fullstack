const { poolPromise, mssql } = require("../config/db");
const bcrypt = require("bcrypt");

const password = async (req, res) => {
  const { password, new_password, confirm_password } = req.body;

  if (!password || !new_password || !confirm_password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ message: "password do not match" });
  }

  const hashedPassword = await bcrypt.hash(new_password, 10);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("password", mssql.VarChar, password)
      .query("SELECT * FROM userInfo where userId = @userId");

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }

    await pool
      .request()
      .input("new_password", mssql.VarChar, hashedPassword)
      .query(
        `UPDATE userInfo SET password = @new_password WHERE userId = @userId`
      );

    return res.status(200).json({ message: "password update" });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.error(err);
  }
};

module.exports = password;
