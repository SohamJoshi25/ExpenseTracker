const express = require("express")
const {createExpense,updateExpense,deleteExpense,getExpense} = require('../controllers/expense.controller.js');
const expenseModel = require("../models/expense.model.js");

const router = express.Router();

router.get("/",getExpense );

router.post("/",createExpense );

router.post("/update/:id", updateExpense );

router.delete("/",deleteExpense );

router.get("/create",(request,response)=>{
    response.render("./views/create.ejs")
})

router.get("/update/:id",async (request,response)=>{
    try{
        const expense = await expenseModel.findById(request.params.id);
        response.render("./views/update.ejs",{_id:request.params.id,expense:expense})
    }catch(e){
        response.render("./views/update.ejs",{_id:request.params.id})
    }
})


module.exports = router;