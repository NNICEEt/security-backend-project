const railFenceService = {
  async encrypt(plainText, key) {
    return new Promise((resolve, reject) => {
      const result = [...Array(key)].map((_) =>
        [...Array(plainText.length)].map((_) => "-")
      );
      let [rowPointer, directionPointer] = [1, "DOWN"];
      for (let c = 0; c < plainText.length; c++) {
        for (let r = 0; r < key; r++) {
          if (r + 1 === rowPointer) {
            result[r][c] = plainText[c];
          }
        }
        if (directionPointer === "UP") {
          rowPointer--;
          if (rowPointer === 0) {
            rowPointer = 2;
            directionPointer = "DOWN";
          }
        } else if (directionPointer === "DOWN") {
          rowPointer++;
          if (rowPointer === key + 1) {
            rowPointer = key - 1;
            directionPointer = "UP";
          }
        }
      }
      const cipherText = result
        .map((row) => row.filter((col) => col !== "-").join(""))
        .join("");
      resolve({ plainText, key, result: { cipherText } });
    });
  },

  async decrypt(cipherText, key) {
    return new Promise((resolve, reject) => {
      const modelArr = [...Array(key)].map((_) =>
        [...Array(cipherText.length)].map((_) => "-")
      );
      let [rowPointer, directionPointer] = [1, "DOWN"];
      for (let c = 0; c < cipherText.length; c++) {
        for (let r = 0; r < key; r++) {
          if (r + 1 === rowPointer) {
            modelArr[r][c] = "*";
          }
        }
        if (directionPointer === "UP") {
          rowPointer--;
          if (rowPointer < 1) {
            rowPointer = 2;
            directionPointer = "DOWN";
          }
        } else if (directionPointer === "DOWN") {
          rowPointer++;
          if (rowPointer > key) {
            rowPointer = key - 1;
            directionPointer = "UP";
          }
        }
      }
      const textArr = cipherText.split("");
      const resultArr = modelArr.map((row) =>
        row.map((col) => (col === "*" ? textArr.shift() : col))
      );
      let plainText = "";
      for (let c = 0; c < cipherText.length; c++) {
        for (let r = 0; r < key; r++) {
          resultArr[r][c] !== "-" && (plainText += resultArr[r][c]);
        }
      }
      resolve({ cipherText, key, result: { plainText } });
    });
  },
};

module.exports = railFenceService;
