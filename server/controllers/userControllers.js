const {poolPromise} = require('../config/db');
const jwt = require('jsonwebtoken');
const mssql = require('mssql');

const getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const data = await pool.request().query('select * from userInfo');
        const result = data.recordset;

        if (result.length === 0) {
            return res.status(404).json({message: 'No user found'});
        }

        const user = {
            firstname: result[0].first_name,
            email: result[0].email,
            phone: result[0].phone_number
        }
        res.status(200).json({user, 'registered': result});
        console.log('user:', user);
        console.log('registered: ', result);
    } catch (err) {
       console.log('error occured', err)
       return res.status(500).json({message: 'database error', error: err.message});
    }
}
   
module.exports = {
    getUsers
}