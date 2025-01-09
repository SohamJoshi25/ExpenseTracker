const express = require("express")
const {createUser,updateUser,deleteUser,getUser,addExpense,deleteExpense} = require('../controllers/user.controller.js')

const router = express.Router();


router.post("/user",createUser );

router.get("/user/:userId",getUser );

router.patch("/user",updateUser );

router.delete("/user/:userId",deleteUser );



router.post("/expense/:userId",addExpense );

router.delete("/expense/:userId",deleteExpense );


module.exports = router;