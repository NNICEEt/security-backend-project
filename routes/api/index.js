const router = require("express").Router();

router.use("/caesar", require("./caesar"));
router.use("/vigenere", require("./vigenere"));
router.use("/railfence", require("./railFence"));
router.use("/rsa", require("./rsa"));

router.get("/", (req, res) => {
  res.json({ Message: "Welcome to Security Project API!!!" });
});

module.exports = router;
