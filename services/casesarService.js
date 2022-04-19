const caesarService = {
  async encrypt(plainText, key) {
    return new Promise((resolve, reject) => {
      try {
        let keyShift = key >= 0 ? key : (key % 26) + 26;
        const cipherText = plainText
          .split("")
          .map((c) => {
            if (c === " ") return c;
            const textChange = c.charCodeAt();
            if (textChange >= 65 && textChange <= 90) {
              return String.fromCharCode(
                ((textChange - 65 + keyShift) % 26) + 65
              );
            } else if (textChange >= 97 && textChange <= 122) {
              return String.fromCharCode(
                ((textChange - 97 + keyShift) % 26) + 97
              );
            }
          })
          .join("");
        resolve({ plainText, key, result: { cipherText } });
      } catch (error) {
        reject(error);
      }
    });
  },
  async decrypt(cipherText, key) {
    return new Promise((resolve, reject) => {
      try {
        this.encrypt(cipherText, -key).then((res) => {
          const {
            result: { cipherText: plainText },
          } = res;
          resolve({ cipherText, key, result: { plainText } });
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = caesarService;
