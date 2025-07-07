const mssql = require('mssql');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        instanceName: 'SQLEXPRESS'
    }
}


const poolPromise = new mssql.ConnectionPool(config)
.connect()
.then(pool => {
    console.log('connected to database');
    return pool;
})
.catch(err => {
    console.error('database connection failed:', err);

})

module.exports = {
    mssql,
    poolPromise
};