
//if there is no session redirect to loginpage
const isLogin = async(req,res,next)=>{

    try {
        if(req.session.user_id){

        }else{
            res.redirect('/');
        }
        next();
        
    } catch (error) {
        console.log(error.message)
        
    }
}

//middleware for if there is session redirect to the dashboard
const isLogout = async(req,res,next)=>{

    try {
        if(req.session.user_id){
            if(req.session.admin===true){
                res.redirect('/admin')
            }else{
                res.redirect('/home')

            }
           
        }
        next();
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports ={
    isLogin,
    isLogout
}