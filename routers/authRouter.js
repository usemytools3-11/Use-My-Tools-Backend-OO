const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");
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

// after / api / auth;
router.post("/register", (req, res) => {
  let user = req.body;
  if (!user.first_name || !user.last_name || !user.email || !user.password) {
    res
      .status(401)
      .json({ message: "Please enter full name, email, and password!" });
  } else {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

// router.post("/register", (req, res) => {
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 12);
//   user.password = hash;
//   db("users")
//     .insert(user, "*")
//     .then(user => {
//       res.status(201).json(user);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  Users.getBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.first_name}`, token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "No record of this account!" });
    });
});

router.post("/authorization", (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    decoded = jwt.verify(token, secret, (error, authorizedData) => {
      if (error) {
        res.status(401).json({ message: "authorization failed!" });
      } else {
        const id = authorizedData.subject;
        Users.getById({ id }).then(user => {
          res.status(200).json(user);
        });
      }
    });
  } else {
    res.status(401).json({ message: "no record of this account!" });
  }
});

// function authorization(req, res, next) {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, secret, (error, decodedToken) => {
//       if (error) {
//         res.status(401).json({ message: "authorization failed!" });
//       } else {
//         req.decodedJwt = decodedToken;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: "no record of this account!" });
//   }
// }

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
