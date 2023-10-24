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
    const id = parseInt(req.params.id, 10); // Convert id to number
    const transaction = transactionArray.find(
      (item) => item.id === id
    );

    if (transaction) {
      res.status(200).send(transaction);
    } else {
      res.status(404).send({ message: "Could not find transaction" });
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
    res.status(201).send(currentTransaction);
  } catch (err) {
    next(err);
  }
});

// DELETE an item by ID
transactionRouter.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = transactionArray.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).send({ message: "Item not found" });
    }

    const deletedItem = transactionArray.splice(itemIndex, 1);

    res.send(deletedItem[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = transactionRouter;
