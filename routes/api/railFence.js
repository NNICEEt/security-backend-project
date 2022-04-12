const router = require("express").Router();
const railFenceService = require("../../services/railFenceService");

router.post("/encrypt", async (req, res) => {
  try {
    const { plainText, key } = req.body;
    const result = await railFenceService.encrypt(plainText, key);
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/decrypt", async (req, res) => {
  try {
    const { cipherText, key } = req.body;
    const result = await railFenceService.decrypt(cipherText, key);
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
