const router = require("express").Router();
const Users = require("../models/usersModel");
const { restricted } = require("../middleware/middleware");

router.get("/", restricted, (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", restricted, async (req, res) => {
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

router.put("/:id", restricted, async (req, res) => {
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

router.delete("/:id", restricted, async (req, res) => {
  try {
    const user = await Users.remove(req.params.id);
    if (user > 0) {
      res.status(200).json({ message: "user has been deleted!" });
    } else {
      res.status(404).json({ message: "user with that ID could not be found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
