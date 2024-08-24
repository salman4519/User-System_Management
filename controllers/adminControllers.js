//declarations
const User = require("../models/userModels")
const bcrypt = require("bcrypt")

// to load Admin page
const loadAdmin = async(req,res)=>{

    try {
        
        const userData = await User.find({isAdmin:false})

        res.render("admin/dashboard",{users:userData})

    } catch (error) {
        console.log(error.message)
    }
}

//to load edit-user Page
const loadEditUser = async(req,res)=>{

    try {
        const id = req.query.id;
        const userData = await User.findById({_id:id});
        
        if(userData){
            res.render('admin/user-edit',{user:userData})
        }else{
            res.redirect('/admin')
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

// to accept from user edit page (post)
const updateUser = async(req,res)=>{

    try {
        const userData = await User.findByIdAndUpdate({_id:req.body.id},{$set:{username:req.body.username,mobile:req.body.mobile,place:req.body.place}})
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message)
    }
}

//to delete user
const deleteUser = async(req,res)=>{
    

    try {
        const id = req.query.id;
        await User.deleteOne({_id:id})
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message)
        
    }
}

//user search
const userSearch =  async (req, res) => {
    const search = req.query.query; // Get the search query from the request

    try {
        // Find users where the username matches the search query (case insensitive)
        const users = await User.find({
            isAdmin:false, $or : [
                 {username: new RegExp(`^${search}`, 'i') },
                { place: new RegExp(`^${search}`, 'i') },
                 { mobile : new RegExp(`^${parseInt(search)}`,'i')}


            ] });

        // Render the dashboard page with the filtered users
        res.render('admin/dashboard', { users }); // Assuming you're using EJS or another template engine
    } catch (error) {
        console.error(error);
       
    }
}

// To logout admin using session
const adminLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');
    });
};



module.exports={
    loadAdmin,
    loadEditUser,
    updateUser,
    deleteUser,
    userSearch,
    adminLogout

}