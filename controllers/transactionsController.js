const express = require("express");
const transactionRouter = express.Router();
const transactionArray = require("../models/data");

transactionRouter.use(express.json());

// GET/READ transactions
transactionRouter.get("/", (req, res, next) => {
  try {
    if (transactionArray && transactionArray.length > 0) {
      res.status(200).send(transactionArray);
    } else {
      res.status(404).send({ message: "Transactions are Not Found" });
    }
  } catch (error) {
    next(error);
  }
});

// READ Transactions SHOW

transactionRouter.get("/:id", (req, res, next) => {
  try {
    const id = req.params;
    const transactionObj = transactionArray.find(
      (transaction) => transaction.id === parseInt(id)
    );
    // parseInt turns a  string into a valid integer
    if (transactionObj) {
      res.status(200).send(transactionObj);
    } else {
      res.status(404).send({ message: "cound not find transaction" });
    }
  } catch (error) {
    next(error);
  }
});

transactionRouter.post("/", (req, res, next) => {
  try {
    const transactionBody = req.body;
    if (transactionBody) {
      transactionArray.push(transactionBody);
      res.status(201).send(transactionArray);
    } else {
      res.status(404).send({ message: "Transaction was not created" });
    }
  } catch (error) {
    next(error);
  }
});

transactionRouter.put("/:id", (req, res, next) => {
  try {
    const transactionId = parseInt(req.params.id);
    const transactionToUpdate = req.body;
    const transationIndex = transactionArray.findIndex(
      (el) => el.id === transactionId
    );
    if (transationIndex === -1) {
      res.status(404).send({ message: "Transaction to update not found" });
    }
// data transaction id match 
    const currentTransaction = transactionArray[transationIndex];
    // loop through requested transactions Array
    for (let key in transactionToUpdate) {
      if (currentTransaction.hasOwnProperty([key])) {
        currentTransaction[key] = transactionToUpdate[key];
        // set this to then equal req.body key
      }
    }
    // update transactionArray to now have new transaction
    transactionArray[transationIndex] = currentTransaction;
    res.status(201).send(currentTransaction)
  } catch (err) {
    next(err);
  }
});

module.exports = transactionRouter;
