const router = require("express").Router();
const lentTools = require("../models/lentToolsModel");

router.get("/", (req, res) => {
  lentTools
    .get()
    .then(tools => {
      res.status(200).json(tools);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const tool = await lentTools.getById(req.params.id);

    if (tool) {
      res.status(200).json(tool);
    } else {
      res.status(404).json({ message: "tool with that ID does not exist!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the tool"
    });
  }
});

module.exports = router;
