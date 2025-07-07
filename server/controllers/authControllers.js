const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {poolPromise} = require('../config/db');
const mssql = require('mssql');

const register = async (req, res) => {
    const {firstName, lastName, username, email, phone, password, confirmPassword} = req.body;
    if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({message: 'all fields are required'})
    }

    if (password !== confirmPassword) {
        return res.status(400).json({message: 'password do not match!'})
    }

    try {
        const pool = await poolPromise;
        const userExists = await pool.request()
        .input('email', mssql.VarChar, email)
        .query('select * from userInfo where email = @email')

        if (userExists.recordset.length > 0) {
            return res.status(409).json({message: 'user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('first_name',mssql.VarChar, firstName)
            .input('last_name',mssql.VarChar, lastName)
            .input('username',mssql.VarChar, username)
            .input('email',mssql.VarChar, email)
            .input('phone_number',mssql.VarChar, phone)
            .input('password',mssql.VarChar, hashedPassword)
            .query(`insert into userInfo (first_name, last_name, username, email, phone_number, password)
                    values (@first_name, @last_name, @username, @email, @phone_number, @password)`);
        return res.status(200).json({message: 'sign up successful'});
    } catch (error) {
        console.error('sign up error', error)
        return res.status(500).json({message: 'internal server error ', error: err.message})
    }
}

// login auth

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'all fields are required!'})
    }

    try {
        const pool = await poolPromise;
        const result = await pool
                .request()
                .input('email',mssql.VarChar, email)
                .query(`select * from userInfo where email = @email`);
        if (result.recordset.length === 0) {
            return res.status(401).json({message: 'invalid email or password'});
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: 'invalid password!'})
        }

     const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        firstName: user.first_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
        return res.status(200).json({message: 'login successful'})

    } catch (err) {
        console.error('login error', err)
        return res.status(500).json({message: 'internal server error', error: err.message});
    }
}

module.exports = {
  register,
  login
};