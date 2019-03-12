const router = require("express").Router();
const Tools = require("../models/toolsModel");

router.get("/", (req, res) => {
  Tools.get()
    .then(tools => {
      res.status(200).json({ tools });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ message: "Couldn't find user by that ID" });
  } else {
    Tools.getById(req.params.id)
      .then(tool => {
        res.status(200).json({ tool });
      })
      .catch(error => res.status(500).json({ error: "couldn't fetch data" }));
  }
});
module.exports = router;
