const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authCheck = (req, res, next) => {
  if (req.cookies.access_token) {
      const token = req.cookies.access_token;
      jwt.verify(token, secret, (err, decoded) => {
          if (err) {
              res.send(401);
          } else {
              console.log(req.user);
              console.log(token);
              req.user_id = decoded.id;
              next();
          }
      });
  } else {
      res.send(401);
  }
};

module.exports = authCheck;