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

router.get("/:id", async (req, res) => {
  try {
    const tool = await Tools.getById(req.params.id);

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

// router.post("/", (req, res) => {
//     if ()
// })

module.exports = router;
