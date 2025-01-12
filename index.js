require('dotenv').config();

//Import Packages
const express = require("express");
const cors = require("cors");

const expenseRouter = require('./routers/expense.router.js');
const pageRouter = require('./routers/page.router.js');

const connectDB = require('./services/connectDB.service.js')

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin: '*',
    credentials: true,
    methods: '*',
    allowedHeaders: '*'
  }));

  
app.set('views', './public')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile);

//Routes
app.use("/",expenseRouter);


//Database Connection
connectDB();

app.listen(process.env.PORT,()=>{
    console.log("Server Started on Port : "+process.env.PORT);
})