const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://myway-learning.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(user);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
