const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
});

const expenseModel = mongoose.model("expense",expenseSchema);
module.exports = expenseModel;