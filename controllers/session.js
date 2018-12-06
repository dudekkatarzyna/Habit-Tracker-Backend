const user_controller = require('../controllers/user');
const User = require('../models/user');
const path = require('path');

exports.homePage = function (req, res) {
    console.log("exports.homePage")
    res.sendFile(path.resolve('public/index.html'));
};

exports.dashboard = function (req, res) {
    console.log("exports.dashboard")
    res.sendFile(path.resolve('public/dashboard.html'));
};

exports.admin = function (req, res) {
    console.log("exports.admin")
    res.sendFile(path.resolve('public/admin.html'));
};

exports.getLogin = function (req, res) {
    console.log("exports.getLogin")
    res.sendFile(path.resolve('public/login.html'));
};

exports.postLogin = function (req, res) {
    console.log("exports.postLogin")
    var username = req.body.username,
        password = req.body.password;

    User.authenticate(username, password, function (error, user) {
        if (error || !user) {
            res.redirect(401, '/login');
        } else {
           // console.log(user);
            req.session.userId = user._id;
            req.session.isAdmin = user.admin;
            if(req.session.isAdmin){
                //redirect to admin view
                console.log("res.redirect('/admin');")
                res.redirect('/admin');
            }
            else { //plain user
                console.log("res.redirect('/dashboard');")
                res.redirect('/dashboard');
            }

        }

    });
};

exports.logout = function (req, res) {
    if (req.session.userId && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        delete req.session.userId;
        res.redirect('/');
    } else {
        res.redirect('/');
    }
};

exports.getRegister = function (req, res) {

    res.sendFile(path.resolve('public/register.html'));
};

exports.postRegister = function (req, res, next) {
    console.log("post");
    user_controller.user_create(req, res)
        .then(user => {
            console.log("id:", user._id);
            req.session.userId = user._id;
            req.session.isAdmin = user.admin;
            res.redirect('/dashboard');
        })
        .catch(error => {

            res.redirect(error.status || 406, '/register');

        });
};