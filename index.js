const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});
