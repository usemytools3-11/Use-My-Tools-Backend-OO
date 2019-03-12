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

module.exports = router;
