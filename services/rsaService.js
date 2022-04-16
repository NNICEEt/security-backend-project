const bigInt = require("big-integer");

const rsaService = {
  async generateKey(keySize) {
    return new Promise(async (resolve, reject) => {
      let publicKey, privateKey;
      while (true) {
        const p = this.getRandomPrime(keySize / 2);
        const q = this.getRandomPrime(keySize / 2);
        const n = p.multiply(q);
        const phi = p.prev().multiply(q.prev());
        let e = this.getRandomPrime(keySize / 8);
        while (bigInt.gcd(e, phi).notEquals(1))
          e = this.getRandomPrim(keySize / 8);
        const d = e.modInv(phi);
        publicKey = btoa(JSON.stringify({ e, n }));
        privateKey = btoa(JSON.stringify({ d, n }));
        if (await this.verify(publicKey, privateKey)) break;
      }
      resolve({
        keySize,
        result: {
          publicKey,
          privateKey,
        },
      });
    });
  },
  async verify(publicKey, privateKey) {
    const plainText =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABC";
    const encrypted = await this.encrypt(plainText, publicKey);
    const decrypted = await this.decrypt(
      encrypted.result.cipherText,
      privateKey
    );
    return plainText === decrypted.result.plainText;
  },
  async encrypt(plainText, key) {
    return new Promise((resolve, reject) => {
      const keyObj = JSON.parse(atob(key));
      const [e, n] = Object.values(keyObj);
      const m = this.encode(plainText);
      const c = m.modPow(bigInt(e), bigInt(n));
      const cipherText = btoa(c);
      resolve({ plainText, key, result: { cipherText } });
    });
  },
  async decrypt(cipherText, key) {
    return new Promise((resolve, reject) => {
      const keyObj = JSON.parse(atob(key));
      const [d, n] = Object.values(keyObj);
      const c = atob(cipherText);
      const m = bigInt(c).modPow(bigInt(d), bigInt(n));
      const plainText = this.decode(m.toString());
      resolve({ cipherText, key, result: { plainText } });
    });
  },
  encode(text) {
    const encoded = text
      .split("")
      .map((c) => c.charCodeAt())
      .join("");
    return bigInt(encoded);
  },
  decode(encodedText) {
    const dec = [];
    const textArr = encodedText.split("");
    let tmp = "";
    while (textArr.length > 0) {
      tmp += textArr.shift();
      if (+tmp >= 32) {
        dec.push(+tmp);
        tmp = "";
      }
    }
    return dec.map((c) => String.fromCharCode(c)).join("");
  },
  getRandomPrime(bits) {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();
    while (true) {
      const randNo = bigInt.randBetween(min, max);
      if (randNo.isProbablePrime(256)) {
        return randNo;
      }
    }
  },
};

module.exports = rsaService;
