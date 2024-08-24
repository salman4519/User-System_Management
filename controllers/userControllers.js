const User = require("../models/userModels");
const bcrypt = require("bcrypt");

// To secure password
const securePassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

// To insert and verify registration
const insertUser = async (req, res, next) => {
    try {
        const spassword = await securePassword(req.body.password);

        const user = new User({
            username: req.body.username,
            mobile: req.body.mobile,
            place: req.body.place,
            password: spassword
        });

        const result = await user.save();
        if (result) {
            return res.render('user/registration', { success: "The registration has been successful" });
        }
    } catch (error) {
        next(error); 
    }
};

// To load registration
const loadRegister = (req, res) => {
    try {
        res.render("user/registration");
    } catch (error) {
        res.status(500).send(error.message); 
    }
};

// To load login
const loadLogin = (req, res) => {
    try {
        res.render("user/login");
    } catch (error) {
        res.status(500).send(error.message); 
    }
};

// To verify login
const verifyLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({ username });

        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                if (userData.isAdmin) {
                    req.session.admin = true;
                    req.session.user_id = userData._id;
                    return res.redirect('/admin');
                }
                req.session.user_id = userData._id;
                return res.redirect('/home');
            } else {
                return res.render('user/login', { message: "Incorrect username or password" });
            }
        } else {
            return res.render('user/login', { message: "Incorrect username or password" });
        }
    } catch (error) {
        next(error); 
    }
};

// To load home
const loadHome = (req, res) => {
    try {
        res.render("user/home");
    } catch (error) {
        res.status(500).send(error.message); 
    }
};

// To logout user using session
const userLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');
    });
};

module.exports = {
    insertUser,
    loadRegister,
    loadLogin,
    loadHome,
    verifyLogin,
    userLogout
};
