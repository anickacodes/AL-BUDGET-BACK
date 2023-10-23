const express = require("express");
const transactionRouter = express.Router;
const transactionArray = require("../models/data");

transactionRouter.use(express.json());

// GET transactions
transactionRouter.get("/", (req, res, next) => {
  try {
    if (transactionArray && transactionArray.length > 0) {
      res.send(transactionArray);
    } else {
      res.status(404).send({ message: "Transactions are Not Found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = transactionRouter;
