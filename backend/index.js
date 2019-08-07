const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./src/routes");
const server = express();

mongoose.connect(
  "mongodb+srv://tindev:XbBKHv1rfKgBkTXJ@tindev-76rwe.mongodb.net/tindev?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(3333);
