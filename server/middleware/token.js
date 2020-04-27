const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).send({msg: 'Unauthorized'});
    }
    try {
        const decodedJwt = jwt.verify(token, secret);
        console.log(decodedJwt);
        next();
    } catch (err) {
        console.log(err);
    }
};