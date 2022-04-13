const bigInt = require("big-integer");

const rsaService = {
  async generateKey(keySize) {
    return new Promise((resolve, reject) => {
      const p = this.getRandomPrime(keySize / 2);
      const q = this.getRandomPrime(keySize / 2);
      const n = p.multiply(q);
      const phi = p.minus(1).multiply(q.minus(1));
      let e = this.getRandomPrime(16);
      while (bigInt.gcd(e, phi).notEquals(1)) e = this.getRandomPrime(16);
      const d = e.modInv(phi);

      const publicKey = { e, n };
      const privateKey = { d, n };

      resolve({
        publicKey: btoa(JSON.stringify(publicKey)),
        privateKey: btoa(JSON.stringify(privateKey)),
      });
    });
  },
  async encrypt(plainText, key) {
    return new Promise((resolve, reject) => {
      const keyObj = JSON.parse(atob(key));
      const [e, n] = Object.values(keyObj);
      const m = this.encode(plainText);
      const c = m.modPow(e, n);
      const cipherText = btoa(c);
      resolve({ plainText, key, result: { cipherText } });
    });
  },
  async decrypt(cipherText, key) {
    return new Promise((resolve, reject) => {
      const keyObj = JSON.parse(atob(key));
      const [d, n] = Object.values(keyObj);
      const c = atob(cipherText);
      const m = bigInt(c).modPow(d, n);
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
      if (randNo.isProbablePrime(128)) {
        return randNo;
      }
    }
  },
};

module.exports = rsaService;
