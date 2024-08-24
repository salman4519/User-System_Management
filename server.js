// connect the database
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Company")

//-----------------------------------------------------------------

//create server
const express = require("express");
const app = express();

//declare body parser
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//cache control
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    next();
  });

//declare view engine
app.set('view engine','ejs')
app.set('views','./views')

//to get access
app.use(express.static('public'))

//accessing userRoute
const userRoute = require("./routes/userRoutes")
app.use('/',userRoute)

//accessing adminRoute
const adminRoute = require("./routes/adminRoutes")
app.use('/',adminRoute)




//create port
app.listen(3000,()=>console.log("the server is running at the port http://localhost:3000/"))