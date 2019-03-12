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

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.lender_id) {
    res.status(400).json({ error: "must enter name, price, and lender_id!" });
  } else {
    try {
      let price = Number(req.body.price);
      const tool = await Tools.add({ ...req.body, price });
      res.status(201).json({ tool, price });
    } catch (error) {
      res.status(500).json({ error, price });
    }
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.lender_id) {
    res.status(400).json({ error: "must enter name, price, and lender_id!" });
  } else {
    try {
      const tool = await Tools.update(req.params.id, req.body);
      if (tool) {
        res.status(200).json(tool);
      } else {
        res.status(404).json({ message: "couldn't find tool by that ID" });
      }
    } catch (error) {
      res.status(500).json({ message: "error updating tool" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tool = await Tools.remove(req.params.id);
    if (tool > 0) {
      res.status(200).json({ message: "tool has been deleted!" });
    } else {
      res.status(404).json({ message: "tool with that ID could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "error deleting the tool" });
  }
});
module.exports = router;
