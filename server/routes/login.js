const pool = require('../db');
const jwt = require('jsonwebtoken');
const helpers = require('../middleware/helpers');

async function doLogin(req, res) {
    const secret = process.env.JWT_SECRET;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({msg: 'Please enter all fields'});
    }
    const rows = await pool.query('SELECT email, password, id as user_id FROM users WHERE email = ?', [email]);

    if (rows.length !== 1) {
        return res.status(403).send({msg: 'Incorrect email or password'});
    }
    const user = rows[0];
    let validPassword;

    try {
        validPassword = await helpers.matchPassword(password, user.password);
    } catch(e) {
        console.log(e);
    }
    if (validPassword) {
        const token = jwt.sign({
                data: {
                    user_id: user.id
                }
            },
            secret, {
                expiresIn: '7d'
            }
        );
        res.cookie('access_token', token);

        return res.status(200).send({

            msg: 'Logged in',
            //
            // token,
            // user
        });
    }
}

module.exports = {
    doLogin
};