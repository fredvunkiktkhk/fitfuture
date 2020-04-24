const express = require("express");
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const helpers = require('../middleware/helpers');

router.post('/', async (req, res) => {
    const secret = process.env.JWT_SECRET;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({msg: 'Please enter all fields'});
    }

    if (email && password) {
        const rows = await pool.query('SELECT email, password, id as user_id FROM users WHERE email = ?', [email],
            (err, results) => {
                if (!err) {
                    if (results.length === 0) {
                        return res.status(403).send({msg: 'Incorrect email'});
                    }
                    const user = results[0];
                    const validPassword = helpers.matchPassword(password, user.password).then(match => {
                        if (match && validPassword) {
                            const token = jwt.sign({
                                   data: {
                                       user_id: user.id
                                   }
                                },
                                secret, {
                                    expiresIn: '7d'
                                }
                            );
                            return res.status(200).send({
                                msg: 'Logged in',
                                token,
                                user: results[0]
                            });
                        }
                        if (!rows.length > 0) {
                            return res.status(403).send({msg: 'Incorrect password'});
                        }
                    }).catch(function (err) {
                        throw err;
                    });
                }
            })
    }
});

module.exports = router;