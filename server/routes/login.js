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
  const users = await pool.query('SELECT email, password, id FROM users WHERE email = ?', [email]);

  if (users.length !== 1) {
    return res.status(403).send({msg: 'Incorrect email or password'});
  }
  const user = users[0];
  let validPassword;

  try {
    validPassword = await helpers.matchPassword(password, user.password);
  } catch (e) {
    throw e;
  }
  if (validPassword) {

    const token = jwt.sign({
      userId: user.id
    }, secret);
    res.cookie('access_token', token);

    return res.status(200).send({

      msg: 'Logged in',
      user
    });
  }
}

module.exports = {
  doLogin
};