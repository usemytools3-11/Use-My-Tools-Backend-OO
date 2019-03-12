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

router.post("/", async (req, res) => {
  if (!req.body.borrower_id || !req.body.tool_id) {
    res.status(400).json({ error: "must enter borrower_id and tool_id!" });
  } else {
    try {
      const tool = await Tools.add(req.body);
      res.status(201).json(tool);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
