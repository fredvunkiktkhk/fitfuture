const express = require("express");
const dbConnection = require('./db');
// const cookieSession = require('cookie-session');
// const sequelize = require('sequelize');
// const path = require('path');
// const serveStatic = require ('serve-static');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/*app.use(serveStatic(path.join(__dirname,"../dist")));
app.get('/', function(req,res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});*/
// app.get('/api/login', require('./api/login'));
// app.use('/api/signup', require('./routes/api/signup'));
// app.get('/api/workouts', require('./api/workouts'));


app.use('/', require('./routes/signup'));

app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users';
    dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

app.listen('3300', () => {
    console.log('Server on port 3300');
});