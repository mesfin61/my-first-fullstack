const { poolPromise, mssql } = require('../config/db');
const bcrypt = require('bcrypt')

const register = async(req, res) => {
    const {first_name, last_name, username, email, phone_number, password, confirmPassword} = req.body;
    if (!first_name || !last_name || !username || !email || !phone_number || !password || !confirmPassword) {
        return res.status(400).json({message: 'all fields are required'});
    }

    if (password !== confirmPassword ) {
        return res.status(400).json({message: 'password do not match'})
    }

    const emaiRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emaiRegex.test(email) === false) {
        return res.status(400).json({message: 'invalid email'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const pool = await poolPromise;
        const userExists = await pool.request()
                            .input('email', mssql.VarChar, email)
                            .query('select * from userInfo where email = @email')
        
        if (userExists.recordset.length > 0) {
            return res.status(400).json({message: 'user already exists'})
        }

         await pool.request()
        .input('first_name', mssql.VarChar, first_name)
        .input('last_name', mssql.VarChar, last_name)
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('phone_number', mssql.VarChar, phone_number)
        .input('password', mssql.VarChar, hashedPassword)
        .query('insert into userInfo (first_name, last_name, username, email, phone_number, password) values (@first_name, @last_name, @username, @email, @phone_number, @password)')
        return res.status(200).json({message: 'sign up successfully'})
    } catch (err) {
        console.error(err);
    }
}

module.exports = register;