const bcrypt = require('bcryptjs');
const pool = require('../db');

async function doSignup(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.send({msg: 'Please fill in all the fields'});
    }

    const usersByEmail = await pool.query('SELECT * FROM users where email = ?', [email]);

    if (usersByEmail.length > 0) {
        return res.send('Email already exists');
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, passwordHash]);
    } catch(e) {
        console.log(e);
    }
    res.send('Sign up successful');
}

module.exports = {
    doSignup
};