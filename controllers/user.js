
const User = require('../models/user');

exports.user_create = function (req, next) {

    if(req.body.password !== req.body.confirmPassword){
        const error=new Error("Not matching");
        error.status = 416;
        return Promise.reject(error);
    }
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname,
            habitsPerUserId: req.body.habitsPerUserId,
            admin: false
        }
    );

    return user.save();
};

exports.user_details = function (req, res, next) {
    User.findById(req, function (err, user) {
        if (err) return next(err);

        return user;
       // res.send(user);
    })
};

exports.user_update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.user_list = function (req, res, next) {

    console.log("in user list")

    User.find({}, function(err, users) {
        console.log("in user find")
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        console.log("user map", userMap)
        res.send(userMap);
    });
};