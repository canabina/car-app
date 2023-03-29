const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBName
});

module.exports = connection;