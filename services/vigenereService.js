const vigenereService = {
  async encrypt(plainText, key) {
    return new Promise((resolve, reject) => {
      try {
        const textCode = [];
        for (let i = 0; i < plainText.length; i++) {
          textCode.push(plainText.toUpperCase().charCodeAt(i));
        }
        const keyCode = [...Array(textCode.length)].map((_, index) =>
          key.toUpperCase().charCodeAt(index % key.length)
        );
        let cipherText = "";
        const lowerCasePos = this.getPos(plainText);
        textCode.forEach((value, index) => {
          if (value >= 32 && value <= 64) {
            cipherText += String.fromCharCode(value);
          } else {
            let result = ((value + keyCode[index]) % 26) + 65; // mod ให้ค่าไม่เกิน 26
            if (lowerCasePos.includes(index)) result = result + 32;
            result = String.fromCharCode(result);
            cipherText += result;
          }
        });
        resolve({ plainText, key, result: { cipherText } });
      } catch (error) {
        reject(error);
      }
    });
  },
  async decrypt(cipherText, key) {
    return new Promise((resolve, reject) => {
      try {
        const textCode = [];
        for (let x = 0; x < cipherText.length; x++) {
          textCode.push(cipherText.toUpperCase().charCodeAt(x));
        }

        const keyCode = [...Array(textCode.length)].map((_, index) =>
          key.toUpperCase().charCodeAt(index % key.length)
        );

        let plainText = "";
        const lowerCasePos = this.getPos(cipherText);
        textCode.forEach((value, index) => {
          if (value >= 32 && value <= 64) {
            plainText += String.fromCharCode(value);
          } else {
            let result = ((value - keyCode[index] + 26) % 26) + 65;
            if (lowerCasePos.includes(index)) result = result + 32;
            result = String.fromCharCode(result);
            plainText += result;
          }
        });
        resolve({ cipherText, key, result: { plainText } });
      } catch (error) {
        reject(error);
      }
    });
  },
  getPos(text) {
    const lowerCasePos = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 97 && code <= 122) {
        lowerCasePos.push(i);
      }
    }
    return lowerCasePos;
  },
};

module.exports = vigenereService;
