const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

router.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password ) {
        return res.send({msg: 'Please fill in all the fields'});
    } else {
        if (email) {
            pool.query('SELECT * FROM users where email = ?', [email], (error, results) => {
                if (results.length > 0) {
                    res.send('Email already exists');
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            const password = hash;
                            pool.query('INSERT INTO users(email, password) VALUES("'+email+'", "'+password+'")',
                                [email, password]);
                            res.send('Sign up successful');
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