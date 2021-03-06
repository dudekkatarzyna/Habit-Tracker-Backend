

const user_controller = require('../controllers/user');
const User = require('../models/user');
const path = require('path');
const jwt = require('jsonwebtoken');
const JWT = require('./JWT')

exports.homePage = function (req, res) {
    res.sendFile(path.resolve('public/index.html'));
};

exports.dashboard = function (req, res) {
    res.sendFile(path.resolve('public/dashboard.html'));
};

exports.admin = function (req, res) {
    res.sendFile(path.resolve('public/admin.html'));
};

exports.getLogin = function (req, res) {
    res.sendFile(path.resolve('public/login.html'));
};

exports.getUserId = function (req, res) {
    console.log(req.session);
    res.send(req.session.userId)
};

exports.postLogin = function (req, res) {

    console.log(req.body)

    const username = req.body.username,
        password = req.body.password;
    const secret = 'mysecretsshhh';

    User.authenticate(username, password, function (error, user) {
        console.log('user ' + user)
        if (error || !user) {
            res.redirect(401, '/login');
        } else {

            const token=JWT.generate(user);
            res.send(token);
            console.log(JWT.verify(token))

        }

    });


};


exports.logout = function (req, res) {
    console.log('logout')
    if (req.session.userId && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        delete req.session.userId;
    }
    res.send('ok')
};

exports.getRegister = function (req, res) {

    res.sendFile(path.resolve('public/register.html'));
};

exports.postRegister = function (req, res, next) {

    user_controller.user_create(req, res)
        .then(user => {
            console.log(user)
            // req.session.userId = user._id;
            // req.session.isAdmin = user.admin;
            res.send(res)
        })
        .catch(error => {

            res.redirect(error.status || 406, '/register');
            res.send(error)

        });
};