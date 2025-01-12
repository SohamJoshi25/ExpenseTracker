const express = require("express")
const router = express.Router();

router.get("/",(request,response)=>{
    response.render('./views/home.ejs',{data:"hi",name:"Soham"})
})


module.exports = router;