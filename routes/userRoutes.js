//declarations
const express = require("express");
const userRoute = express();

//to access user control
const userController = require("../controllers/userControllers")

//session handling
const session = require('express-session')
const config = require("../config/config")
userRoute.use(session({secret:config}))

//middleware
const auth = require("../middleware/auth")

//route for register
userRoute.get('/register',auth.isLogout,userController.loadRegister)
userRoute.post('/register',userController.insertUser)


//route for login
userRoute.get('/',auth.isLogout,userController.loadLogin)
userRoute.post('/',userController.verifyLogin)

//route for home
userRoute.get('/home',auth.isLogin,userController.loadHome)

// route for logout
userRoute.get('/logout',auth.isLogin,userController.userLogout)




module.exports = userRoute;