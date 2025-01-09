const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
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
        default:0
    }
},{_id:false});

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    expenses:{
        type:[expenseSchema]
    }
});

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;