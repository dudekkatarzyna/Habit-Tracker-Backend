

const User = require('../models/user');


exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.user_create = function (req, res, next) {

    //console.log(req.body);
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
            habitsPerUserId: req.body.habitsPerUserId
        }
    );

    return user.save();
    // return user.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //    // res.send(user);
    // })
};

exports.user_details = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
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
    User.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
};