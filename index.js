require('dotenv').config();

//Import Packages
const express = require("express");
const cors = require("cors");

const userRouter = require('./routers/user.router.js');
const connectDB = require('./services/connectDB.service.js')

const app = express();

//Middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin: '*',
    credentials: true,
    methods: '*',
    allowedHeaders: '*'
  }));

//Routes
app.use("/api",userRouter);
  

app.set('views', './public/views')
app.set('view engine','ejs')

//Database Connection
connectDB();

app.listen(process.env.PORT,()=>{
    console.log("Server Started on Port : "+process.env.PORT);
})