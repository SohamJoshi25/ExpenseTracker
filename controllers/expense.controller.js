const expenseModel = require("../models/expense.model.js");

const createExpense = async (request,response) => {
    try {
        const username =  request.body.username;
        const name =  request.body.name;
        const label =  request.body.label;
        const type =  request.body.type;
        const amount =  request.body.amount;

        if(!username || !name || !label || !type || !amount){
            return response.status(500).json({message:"Missing parameters"})
        }

        const expense = new expenseModel({username:username,name:name,label:label,type:type,amount:amount});

        await expense.save();

        return response.redirect('/');

    } catch (error) {
        console.log(error);
        response.status(500).json({message:"error"})
    }
}

const getExpense = async (request,response) => {
    try {
        const expenses = await expenseModel.find();
        let credit = 0;
        let debit = 0;
        expenses.forEach((expense)=>{
            if(expense.type.toLowerCase()=="credit"){
                credit += expense.amount;
            }else{
                debit += expense.amount;
            }
        })
        return response.render("./views/home.ejs",{message:"success",expenses:expenses,credit:credit,debit:debit})
    } catch (error) {
        console.log(error);
        response.status(500).json({message:"error"})
    }
}

const updateExpense = async (request,response) => {
    try {
        const expenseId = request.params.id;

        const username =  request.body.username;
        const name =  request.body.name;
        const label =  request.body.label;
        const type =  request.body.type;
        const amount =  request.body.amount;

        if(!expenseId){
            return response.status(500).json({message:"Missing parameters"})
        }

        const newExpense = {username,name,label,type,amount};

        const updatedExpense = await expenseModel.findByIdAndUpdate(expenseId,newExpense,{new:true})

        if(!updatedExpense){
            return response.status(404).json({message:"Expense Not Found"})
        }

        return response.redirect('/');

    } catch (error) {
        console.log(error);
        response.status(500).json({message:"error"})
    }
}

const deleteExpense = async (request,response) => {
    try {
        const expenseId = request.body._id;
        console.log(request.body)

        if(!expenseId){
            return response.status(500).json({message:"Missing parameters"})
        }

        const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);

        return response.status(200).json({mesage:"success"});

    } catch (error) {
        console.log(error);
        return response.status(500).json({message:"error"})
    }
}



module.exports = {createExpense,updateExpense,deleteExpense,getExpense}
