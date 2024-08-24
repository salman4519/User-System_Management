//declarations
const express = require("express");
const adminRoute = express();

//to access user control
const adminControllers = require("../controllers/adminControllers")

//session handling
const session = require('express-session')
const config = require("../config/config")
adminRoute.use(session({secret:config}))

//middleware
const auth = require("../middleware/auth")

//route for admin
adminRoute.get('/admin',auth.isLogin,adminControllers.loadAdmin)

//route for user edit page
adminRoute.get('/admin/edit-user',auth.isLogin,adminControllers.loadEditUser)
adminRoute.post('/admin/edit-user',adminControllers.updateUser)

//route for user edit page
adminRoute.get('/admin/delete-user',auth.isLogin,adminControllers.deleteUser)

//route for user search
adminRoute.get('/admin/search',auth.isLogin,adminControllers.userSearch)

// to logout admin
adminRoute.post('/admin/logout',adminControllers.adminLogout)

// to redirect when go to wrong route
adminRoute.get('*',(req,res)=>{
    res.redirect('/admin')
})




module.exports = adminRoute;