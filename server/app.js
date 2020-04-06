const express = require("express");
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const serveStatic = require ('serve-static');

dotenv.config({ path: './config/config.env'});

const app = express();

app.use(serveStatic(path.join(__dirname,"../dist")));
app.get('/', function(req,res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});
// app.get('/api/login', require('./api/login'));
// app.get('/api/signup', require('./api/signup'));
// app.get('/api/workouts', require('./api/workouts'));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

db.connect(function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('connected')
});

app.get('/users', (req, res) => {
   let sql = 'SELECT * FROM users';
   db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result)
   });
});


app.listen('3200', () => {
   console.log('Server on port 3200');
});