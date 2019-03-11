const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/usersModel");
const secret = process.env.JWT_SECRET || "secret";

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
    //add other info about user
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

// after /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "No record of this account!" });
    });
});

// function restricted(req, res, next) {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, secret, (error, decodedToken) => {
//       if (error) {
//         res.status(401).json({ message: "login failed!" });
//       } else {
//         req.decodedJwt = decodedToken;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: "No record of this account!" });
//   }
// }

module.exports = router;
