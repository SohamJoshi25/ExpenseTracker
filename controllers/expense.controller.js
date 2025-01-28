const expenseModel = require("../models/expense.model.js");

//Create a new Expense and put into database 
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

        const expense = new expenseModel({username:username,name:name,label:label,type:type,amount:amount}) //Create a new Expense Model Object from new Values

        await expense.save(); //Save the newly created Object to remote Database

        return response.redirect('/');
        //return response.send(200).json({expense:expense})

    } catch (error) {
        console.log(error);
        response.status(500).json({message:"error"})
    }
}

//Get all expense records present in database
const getExpense = async (request,response) => {
    try {
        const expenses = await expenseModel.find();

        let credit = 0;
        let debit = 0;

        for(let i = 0; i<expenses.length;i++){

            const expense = expenses[i];

            if(expense.type.toLowerCase()=="credit"){
                credit += expense.amount;
            }else{//Debit
                debit += expense.amount;
            }
        }

        return response.render("./views/home.ejs",{message:"success",expenses:expenses,credit:credit,debit:debit})
        //return response.send(200).json({expenses:expenses})

    } catch (error) {
        console.log(error);
        response.status(500).json({message:"error"})
    }
}

//Update a Expense Record in database
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

        return response.redirect('/');
        //return response.send(200).json({updatedExpense:updatedExpense})

    } catch (error) {
        console.log(error);
        response.status(500).json({message:"error"})
    }
}

//Delete a Expense from Database
const deleteExpense = async (request,response) => {
    try {
        const expenseId = request.params.id;

        if(!expenseId){
            return response.status(500).json({message:"Missing parameters"})
        }

        const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);

        return response.status(200).json({mesage:"success",deletedExpense:deletedExpense});

    } catch (error) {
        console.log(error);
        return response.status(500).json({message:"error"})
    }
}

module.exports = {createExpense,updateExpense,deleteExpense,getExpense}
