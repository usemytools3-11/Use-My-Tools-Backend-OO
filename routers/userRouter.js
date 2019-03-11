const router = require("express").Router();
const Users = require("../models/usersModel");

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
