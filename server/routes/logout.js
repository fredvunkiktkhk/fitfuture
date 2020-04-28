async function doLogout(req, res) {
  res.cookie('access_token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true

  });
  res.status(200).json('Logged out');
}

module.exports = {
  doLogout
};
