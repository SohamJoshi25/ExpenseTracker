const express = require("express")
const {createExpense,updateExpense,deleteExpense,getExpense} = require('../controllers/expense.controller.js')

const router = express.Router();

router.get("/",getExpense );

router.post("/",createExpense );

router.patch("/",updateExpense );

router.delete("/",deleteExpense );

router.get("/create",(request,response)=>{
    response.render("./views/create.ejs")
})

router.get("/update/:id",(request,response)=>{
    response.render("./views/update.ejs",{_id:request.params.id})
})


module.exports = router;