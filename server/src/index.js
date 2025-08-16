const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(user);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
