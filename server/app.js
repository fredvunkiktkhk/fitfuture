const express = require("express");
const cors = require('cors');
// const authCheck = require('./middleware/token');
// const serveStatic = require ('serve-static');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors({
    credentials: true,
}));
app.use('/', require('./routes'));

/*app.use(serveStatic(path.join(__dirname,"../dist")));
app.get('/', function(req,res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});*/
// app.use('/login', require('./routes/login'));
// app.use('/signup', require('./routes/signup'));
// // app.get('/api/workouts', require('./api/workouts'));
// app.use('/workouts', require('./routes/workouts'));
//
//
// app.get('/users', (req, res) => {
//     let sql = 'SELECT * FROM users';
//     pool.query(sql, (err, result) => {
//         if (err) throw err
//         res.send(result)
//     });
// });

app.listen('3300', () => {
    console.log('Server on port 3300');
});