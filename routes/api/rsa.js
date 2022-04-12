const router = require("express").Router();

router.get("/encrypt", async (req, res) => {
  try {
    res.json({ Message: "Hi" });
  } catch (error) {}
});

router.post("/decrypt", async (req, res) => {});

module.exports = router;
