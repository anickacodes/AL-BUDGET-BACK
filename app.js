const express = require("express");
const app = express();
const cors = require("cors");
const transactionsController = require("./controllers/transactionsController");

app.use(cors({ origin: "http://localhost:3333" }));
app.use(express.json());

app.use("/transactions", transactionsController);

module.exports = app;
