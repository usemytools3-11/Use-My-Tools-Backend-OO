const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

//restricts certain endpoints so that only users who are logged in can view them
function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "login failed!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No record of this account!" });
  }
}

module.exports = {
  restricted
};
