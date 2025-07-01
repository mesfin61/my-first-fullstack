const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mssql = require('mssql');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const config = {
  user: "mesfin",
  password: "@Mes6163",
  server: "MESFIN", 
  database: "users",
  options: {
    encrypt: true,
    trustServerCertificate: true,
    instanceName: "SQLEXPRESS"
  },
  port: 1433
};



app.get('/cards', async(req, res) => {
  try {
    const pool = await mssql.connect(config);
    const data = await pool.request().query('select * from userInfo');
    console.log('registered: ', data.recordset);
    res.status(200).json(data.recordset);
  }
  catch(err) {
    console.log('error occured', err);
    res.status(500).json({message: 'database error:', error: err.message});
  } 
})


app.post('/api/signup', async(req, res) => {
  const {firstName, lastName, username, email, phone, password, confirmPassword} = req.body;

  if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword ) {
    return res.status(400).json({message: "All fields are required!"});
  }

  if (password !== confirmPassword) {
    return res.status(400).json({message: "password do not match!"});
  }

  try {
    const pool = await mssql.connect(config);
    const userExits = await pool.request()
      .input('email', mssql.VarChar, email.toLowerCase())
      .input('username', mssql.VarChar, username)
      .query(`select * from userInfo where LOWER(email) = LOWER(@email) or LOWER(username) = LOWER(@username)`);

      if (userExits.recordset.length > 0) {
        return res.status(409).json({message: "user already exists"});
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.request()
        .input('first_name', mssql.VarChar, firstName)
        .input('last_name', mssql.VarChar, lastName)
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('phone_number', mssql.VarChar, phone)
        .input('password', mssql.VarChar, hashedPassword)
        .query(`INSERT INTO userInfo (first_name, last_name, username, email, phone_number, password)
                VALUES (@first_name, @last_name, @username, @email, @phone_number, @password) `);
      return res.status(200).json({message: 'sign up successful'});
  }
  catch(err) {
    console.error('sign up error', err)
    return res.status(500).json({message: 'Internal server error', error: err.message})
  }
})

app.post('/api/login', async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({message: 'email and password are required'})
  }

  try {
    const pool = await mssql.connect(config);

    const result = await pool.request()
      .input('email', mssql.VarChar, email.toLowerCase())
      .query(`select * from userInfo where LOWER(email) = LOWER(@email)`);
    
      if (result.recordset.length === 0) {
        return res.status(401).json({message: 'invalid email or password'});
      }

      const user = result.recordset[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch ) {
        return res.status(401).json({message: 'invalid password'});
      }

      return res.status(200).json({message: 'login successful'});
  }
  catch(err) {
    console.error('login error', err)
    return res.status(500).json({message: 'internal server error', error: err.message});
  }
})

app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`);
})
