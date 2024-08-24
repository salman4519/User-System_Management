//declarations
const mongoose = require("mongoose")

//create schema (achh)
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

//export the module
const User = mongoose.model('User',userSchema);
module.exports = User;