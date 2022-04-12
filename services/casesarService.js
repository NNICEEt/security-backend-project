const caesarService = {
  async encrypt(plainText, key) {
    return new Promise((resolve, reject) => {
      const textCode = [];
      let keyShift = key >= 0 ? key : (key % 26) + 26;
      for (let i = 0; i < plainText.length; i++) {
        let textChange = plainText.charCodeAt(i);
        if (textChange >= 65 && textChange <= 90) {
          upperCase = String.fromCharCode(
            ((textChange - 65 + keyShift) % 26) + 65
          );
          textCode.push(upperCase);
        } else if (textChange >= 97 && textChange <= 122) {
          lowerCase = String.fromCharCode(
            ((textChange - 97 + keyShift) % 26) + 97
          );
          textCode.push(lowerCase);
        }
      }
      const cipherText = textCode.join("");
      resolve({ plainText, key, result: { cipherText } });
    });
  },
  async decrypt(cipherText, key) {
    return new Promise((resolve, reject) => {
      this.encrypt(cipherText, -key).then((res) => {
        const {
          result: { cipherText: plainText },
        } = res;
        resolve({ cipherText, key, result: { plainText } });
      });
    });
  },
};

module.exports = caesarService;
