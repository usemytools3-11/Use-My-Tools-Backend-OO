const router = require("express").Router();
const Users = require("../models/usersModel");

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user with that ID does not exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.password
  ) {
    res
      .status(400)
      .json({ error: "must enter first name, lastname, email, and password!" });
  } else {
    try {
      const updatedUser = await Users.update(req.params.id, req.body);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "error updating user" });
      }
    } catch (error) {
      res.status(500).json({ message: "error updating user" });
    }
  }
});

module.exports = router;
