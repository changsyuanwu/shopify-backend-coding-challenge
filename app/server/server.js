const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const dbClient = require("./db/client");

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const inventoryRouter = require("./routes/inventory");

app.use(inventoryRouter);

app.listen(port, () => {
  // connect to mongodb when server starts
  dbClient.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
