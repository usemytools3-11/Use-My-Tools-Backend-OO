const router = require("express").Router();
const lentTools = require("../models/lentToolsModel");

router.get("/", async (req, res) => {
  try {
    lentTools = await lentTools.get();
    res.status(200).json(lentTools);
  } catch (error) {
    res.status(500).json({ message: "could not fetch tools" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const lentTool = await lentTools.findById(req.params.id);
    if (lentTool) {
      res.status(200).json(lentTool);
    } else {
      res.status(400).json({ message: "rental not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "could not fetch lent tool" });
  }
});

module.exports = router;
