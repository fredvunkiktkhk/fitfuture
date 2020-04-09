const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

dbConnection.connect(function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('connected')
});

module.exports = dbConnection;