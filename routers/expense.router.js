const express = require("express")
const {createExpense,updateExpense,deleteExpense,getExpense} = require('../controllers/expense.controller.js')

const router = express.Router();

router.get("/expense",getExpense );

router.post("/expense",createExpense );

router.patch("/expense",updateExpense );

router.delete("/expense",deleteExpense );


module.exports = router;