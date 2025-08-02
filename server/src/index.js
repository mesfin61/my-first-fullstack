const express = require("express");
const cors = require("cors");
const user = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(user);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
