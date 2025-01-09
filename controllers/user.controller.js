const userModel = require("../models/user.model.js");

const createUser = async (request,response) => {
    try{
        const newUsername = request.body.username;
        const newPassword = request.body.password;
        
    
        if(!newUsername || !newPassword){
            return response.status(403).json({
                error:"Username and password missing."
            })
        }
    
        const user = new userModel({
            username:newUsername,
            password:newPassword
        })
    
        await user.save();
    
        return response.status(200).json({
            message:"success",
            user:user
        })

    }catch(e){
        return response.status(500).json({
            message:"Internal Server Error",
            error:e
        })
    }
    
}

const updateUser = async (request,response) => {
    try{
        const userId = request.params.userId;
        const newPassword = request.body.password;
    
        if(!userId || !newPassword){
            return response.status(403).json({
                error:"Username and password missing."
            })
        }

        const user = await userModel.findByIdAndUpdate(userId,{password:newPassword},{new: true})

        if(!user){
            return response.status(404).json({
                message:"User Not Found"
            })
        }

        response.status(200).json({
            message:"success",
            user:user
        })

    }catch(e){
        response.status(500).json({
            message:"Internal Server Error",
            error:e
        })
    }
}

const deleteUser = async (request,response) => {
    try{
        const userId = request.params.userId;
        const password = request.body.password;
    
        if(!userId || !password){
            return response.status(403).json({
                error:"Username and password missing."
            })
        }

        const user = await userModel.findOneAndDelete({_id:userId,password:password},{new: true})


        if(!user){
            return response.status(404).json({
                message:"User Not Found or password incorrect"
            })
        }

        return response.status(200).json({
            message:"Deleted",
            user:user
        })

    }catch(e){
        return response.status(500).json({
            message:"Internal Server Error",
            error:JSON.stringify(e)
        })
    }
}


const getUser = async (request,response) => {
    try{
        const userId = request.params.userId;

        if(!userId){
            return response.status(403).json({
                error:"User ID missing"
            })
        }

        const user = await userModel.findById(userId)

        if(!user){
            return response.status(404).json({
                message:"User Not Found"
            })
        }

        response.status(200).json({
            message:"success",
            user:user
        })

    }catch(e){
        response.status(500).json({
            message:"Internal Server Error",
            error:e
        })
    }
}

const addExpense = async (request,response) => {
    try{
        const userId = request.params.userId;
        const name = request.body.name;
        const label = request.body.label;
        const type = request.body.type;
        const amount = request.body.amount;
        
    
        if(!name || !label || !type || !amount || !userId){
            return response.status(403).json({
                error:"Missing Parameters."
            })
        }

    
        const expense = {name,label,type,amount};
    
        const user = await userModel.findById(userId);

        if(!user){
            return response.status(404).json({
                error:"User Not Found."
            })
        }

        user.expenses.push(expense);

        await user.save();

        return response.status(200).json({
            message:"success",
            expense:expense
        })

    }catch(e){
        return response.status(500).json({
            message:"Internal Server Error",
            error:e
        })
    }
}

const deleteExpense = async (request,response) => {
    try{
        const userId = request.params.userId;
        const name = request.body.name;
        const label = request.body.label;
        const type = request.body.type;
        const amount = request.body.amount;
        
    
        if(!name || !label || !type || !amount || !userId){
            return response.status(403).json({
                error:"Missing Parameters."
            })
        }

    
        const expense = {name,label,type,amount};
    
        const user = await userModel.findByIdAndUpdate(userId,{
            $pull:{
                expenses:expense
            }
        });

        if(!user || user.nModified == 0){
            return response.status(404).json({
                error:"User Not Found."
            })
        }else{
            return response.status(200).json({
                message:"deleted",
                expense:expense
            })
        }

    }catch(e){
        return response.status(500).json({
            message:"Internal Server Error",
            error:e
        })
    }
}




module.exports = {createUser,updateUser,deleteUser,getUser,addExpense,deleteExpense}
