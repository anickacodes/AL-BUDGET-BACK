const express = require("express");
const transactionRouter = express.Router();
const transactionArray = require("../models/data");

transactionRouter.use(express.json());

// GET/READ transactions
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


// READ Transactions SHOW 

transactionRouter.get('/:id', (req, res, next) => {

try{
    const {id }= req.params
    const transactionObj = transactionArray.find(transaction => transaction.id === parseInt(id))
    // parseInt turns a  string into a valid integer
    if(transactionObj) {
        res.send(transactionObj)
    }
    else {
        res.status(404).send({message: "cound not find transaction"})
    }
}
catch(error) {
next(error)
}
})












module.exports = transactionRouter;
