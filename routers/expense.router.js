const express = require("express")
const {createExpense,updateExpense,deleteExpense,getExpense} = require('../controllers/expense.controller.js')
const expenseModel = require("../models/expense.model.js")

const router = express.Router()

router.get("/",getExpense)

router.post("/",createExpense)

router.post("/update/:id", updateExpense)

router.delete("/:id",deleteExpense)

router.get("/create",(request,response)=>{
    response.render("create.ejs")
})

router.get("/update/:id",async (request,response)=>{
    try{
        const expense = await expenseModel.findById(request.params.id);
        response.render("update.ejs",{_id:request.params.id,expense:expense})
    }catch(e){
        response.render("update.ejs",{_id:request.params.id})
    }
})

// Use and explain this in frontend
//
// router.get("/update",(request,response)=>{
//     response.render("./views/update.ejs",{_id:request.params.id,expense:expense})
// })
//
// router.get("/",(request,response)=>{
//     response.render("./views/home.ejs",{expenses:[{name:"My Expense",username:"User1",label:"Personal",type:"credit",amount:4000}]})
// })

module.exports = router