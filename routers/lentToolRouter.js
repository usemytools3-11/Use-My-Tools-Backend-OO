const router = require("express").Router();
const lentTools = require("../models/lentToolsModel");
const Tools = require("../models/toolsModel");
const { restricted } = require("../middleware/middleware");

router.get("/", restricted, (req, res) => {
  lentTools
    .get()
    .then(tools => {
      res.status(200).json(tools);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", restricted, changeBool, async (req, res) => {
  if (!req.body.borrower_id || !req.body.tool_id) {
    res.status(400).json({ error: "must enter borrower_id and tool_id!" });
  } else {
    try {
      const tool = await lentTools.add(req.body);
      res.status(201).json(tool);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

async function changeBool(req, res, next) {
  try {
    const id = req.body.tool_id ? req.body.tool_id : req.params.id;
    const tool = await Tools.getById(id);
    if (tool) {
      try {
        const boolUpdated = { ...tool, is_borrowed: !tool.is_borrowed };
        await Tools.update(boolUpdated.id, boolUpdated);

        next();
      } catch (error) {
        res
          .status(500)
          .json({ message: "something went wrong updating boolean!" });
      }
    } else {
      res.status(404).json({ message: "couldn't find tool by that ID!" });
    }
  } catch (error) {
    res.send(error);
  }
}

router.delete("/:id", restricted, changeBool, async (req, res) => {
  try {
    const tool_id = req.params.id;
    lentTool = await lentTools.getBy({ tool_id });
    try {
      const tool = await lentTools.remove(lentTool.id);
      if (tool > 0) {
        res.status(200).json({ message: "lent-tool has been deleted!" });
      } else {
        res
          .status(404)
          .json({ message: "lent-tool with that ID could not be found" });
      }
    } catch (error) {
      res.status(500).json({ message: "error deleting the lent tool" });
    }
  } catch (error) {
    res.status(500).status({ error });
  }
});

module.exports = router;
