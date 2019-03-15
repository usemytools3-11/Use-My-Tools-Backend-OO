const router = require("express").Router();
const Tools = require("../models/toolsModel");
const { restricted } = require("../restricted-middleware/middleware");

const deleteBorrowRequest = async function(req, res, next) {
  try {
    const tool_id = req.params.id;
    const lentTool = await lentTools.getBy({ tool_id });
    if (!lentTool) {
      next();
    } else {
      try {
        const tool = await lentTools.remove(lentTool.id);
        if (tool > 0) {
          res.status(200).json({ message: "tool request has been deleted!" });
          next();
        } else {
          res
            .status(404)
            .json({ message: "tool request with that ID could not be found" });
        }
      } catch (error) {
        res.status(500).json({ message: "tool could not be removed" });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

//for /api/tools
router.get("/", restricted, (req, res) => {
  Tools.get()
    .then(tools => {
      res.status(200).json({ tools });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", restricted, async (req, res) => {
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

router.post("/", restricted, async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.lender_id) {
    res.status(400).json({ error: "must enter name, price, and lender_id!" });
  } else {
    try {
      const tool = await Tools.add(req.body);

      res.status(201).json({ tool });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
});

router.put("/:id", restricted, async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.lender_id) {
    res.status(400).json({ error: "must enter name, price, and lender_id!" });
  } else {
    try {
      const count = await db("tools")
        .where({ id: req.params.id })
        .update(req.body);

      if (count > 0) {
        const tool = await db("tools")
          .where({ id: req.params.id })
          .first();

        res.status(200).json(tool);
      } else {
        res.status(404).json({ error: "tool not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.delete("/:id", deleteBorrowRequest, restricted, async (req, res) => {
  try {
    const tool = await Tools.remove(req.params.id);
    if (tool > 0) {
      res.status(200).json({ message: "tool has been deleted!" });
    } else {
      res.status(404).json({ message: "tool with that ID could not be found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
