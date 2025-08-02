const { poolPromise, mssql } = require("../config/db");

const account = async (req, res) => {
  const { first_name, last_name, username, email, phone_number } = req.body;

  if (!first_name || !last_name || !username || !email || !phone_number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email) === false) {
    return res.status(400).json({ message: "invalid emails" });
  }

  try {
    const pool = await poolPromise;

    const emailCheck = await pool
      .request()
      .input("email", mssql.VarChar, email)
      .input("userId", mssql.Int, req.user.id)
      .query(
        `SELECT * FROM userInfo WHERE email = @email AND userId != @userId`
      );

    if (emailCheck.recordset.length > 0) {
      return res
        .status(409)
        .json({ message: "Email already in use by another account" });
    }

    const result = await pool
      .request()
      .input("first_name", mssql.VarChar, first_name)
      .input("last_name", mssql.VarChar, last_name)
      .input("username", mssql.VarChar, username)
      .input("email", mssql.VarChar, email)
      .input("phone_number", mssql.VarChar, phone_number)
      .input("userId", mssql.Int, req.user.id).query(`
        UPDATE userInfo
        SET first_name = @first_name,
            last_name = @last_name,
            email = @email,
            phone_number = @phone_number
        WHERE userId = @userId
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "update successful" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = account;
