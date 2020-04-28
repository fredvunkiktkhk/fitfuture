const pool = require('../db');
const jwt = require('jsonwebtoken');
const helpers = require('../middleware/helpers');

async function doLogin(req, res) {
  const secret = process.env.JWT_SECRET;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({msg: 'Please enter all fields'});
  }
  const users = await pool.query('SELECT email, password, id FROM users WHERE email = ?', [email]);

  if (users.length !== 1) {
    return res.status(403).json({msg: 'Incorrect email or password'});
  }
  const user = users[0];
  let validPassword;

  try {
    validPassword = await helpers.matchPassword(password, user.password);
  } catch (err) {
    throw res.status(400).send(err);
  }
  if (validPassword) {

    const token = jwt.sign({
      userId: user.id
    }, secret);
    res.cookie('access_token', token, {
      expiresIn: 3600 * 60 * 9000,
      httpOnly: true,
    });

    return res.status(200).json({msg: 'Logged in'});
  }
}

module.exports = {
  doLogin
};