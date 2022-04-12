const router = require("express").Router();

router.use("/api", require("./api"));

router.get("/", (req, res) => {
  res.json({ Message: "Welcome to Security Project Server!!!" });
});

module.exports = router;
