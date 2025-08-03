const express = require("express");
const router = express.Router();
const { people } = require("../data");

router.get("/", (req, res) => {
  res.json(people);
});

router.post("/", (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  people.push({
    id: people.length + 1,
    name: req.body.name,
  });

  res.status(201).json({
    success: true,
    name: req.body.name,
  });
});

module.exports = router;
