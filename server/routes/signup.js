const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const dbConnection = require('../db');

router.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password ) {
        return res.send({msg: 'Please fill in all the fields'});
    } else {
        if (email) {
            dbConnection.query('SELECT * FROM users where email = ?', [email], (error, results) => {
                if (results.length > 0) {
                    res.send('Email already exists');
                } else {
                    res.send('Sign up successful');
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            const password = hash;
                            dbConnection.query('INSERT INTO users(email, password) VALUES("'+email+'", "'+password+'")',
                                [email, password]);
                        })
                    });
                }
            });
        } else {
            res.send('Enter Email');
            next();
        }
    }
});

module.exports = router;