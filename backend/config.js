const mysql = require('mysql');
require('dotenv').config();

// example: {
    // host: 'localhost',
    // user: 'root',
    // password: 'mysql-root-user-password',
    // database: 'fake_store_db'
// }

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})

module.exports = connection;