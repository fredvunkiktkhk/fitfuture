const express = require("express");
const pool = require('./db');
// const cookieSession = require('cookie-session');
// const sequelize = require('sequelize');
// const path = require('path');
// const serveStatic = require ('serve-static');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

/*app.use(serveStatic(path.join(__dirname,"../dist")));
app.get('/', function(req,res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});*/
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
// app.get('/api/workouts', require('./api/workouts'));
app.use('/workouts', require('./routes/workouts'));

app.use('/', require('./routes/signup'));

app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users';
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

app.listen('3300', () => {
    console.log('Server on port 3300');
});