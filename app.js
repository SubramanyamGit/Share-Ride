const express = require("express");
const dotenv = require("dotenv");
const route = require('./routes/index');

const app = express();
app.use(express.json());

dotenv.config(".env");

route.initialize(app);

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
