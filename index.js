require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const cors = require("cors")

const myRouter = require('./routers/expense.router.js')

const app = express()

//Middlewares
app.use(express.urlencoded());
app.use(express.json())
app.use(express.static('public'))
app.use(cors());

//Necessary to render .ejs pages
app.set('views', './public/views')
app.set('view engine','ejs')

//Mount Router
app.use("/",myRouter)

//Database Connection
app.listen(process.env.PORT,async ()=>{

  console.log("Server Started on Port:"+process.env.PORT)

  //Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGOURI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log("Connection to MongoDB Failed")
  }
  
})


