const router = require("express").Router();
const rsaService = require("../../services/rsaService");

router.post("/generate-key", async (req, res) => {
  try {
    const { keySize } = req.body;
    const result = await rsaService.generateKey(keySize);
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/encrypt", async (req, res) => {
  try {
    const { plainText, key } = req.body;
    const result = await rsaService.encrypt(plainText, key);
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/decrypt", async (req, res) => {
  try {
    const { cipherText, key } = req.body;
    const result = await rsaService.decrypt(cipherText, key);
    res.status(200).json(result);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
