const User = require('../models/user');
const JWT = require("./JWT");

exports.user_create = function (req, next) {

    console.log('create')
    console.log(req.body)
    if(User.find({username:req.body.username}).count())
    {
        const error = new Error("User already exists");
        error.status = 406;
        return Promise.reject(error);
    }
    if (req.body.password !== req.body.confirmPassword) {
        const error = new Error("Not matching");
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
    user.save();

    return new Promise((res, rej) => {
        res(user)

    });
};

exports.user_details= function (req, res, next) {


    console.log('jwt ', req.get("Authorization"))
    const decoded = JWT.verify(req.get("Authorization"))
    console.log(decoded.userId)
    console.log(req.params.id)
    if(!(decoded.userId===req.params.id)){
        res.send(null);
    }
    else{
        //verify token, jeśli error to wyloguj
        //z headeara, decode, porównanie z id.
        User.findById(req.params.id, function (err, user) {
            if (err) return next(err);

            console.log('user: '+user)
            //return user;
            res.send(user);
        });
    }


};

exports.user_update = function (req, res, next) {
    // console.log('req:', req);

    const userId = req.userId;

    // console.log(userId);
    User.findByIdAndUpdate(userId, {$push: {habitsPerUserId: req._id}}, function (err) {
        if (err) return next(err);

        // console.log('success');
        // res.send('User udpated.');
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};

exports.user_list = function (req, res, next) {

    //   console.log("in user list")

    User.find({}, function (err, users) {
        // console.log("in user find")
        const userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        //  console.log("user map", userMap);
        res.send(userMap);
    });
};

exports.user_deleteHabit = async function (req,res) {

    await User.findByIdAndUpdate({_id: req.body.userId}, {$pull: {habitsPerUserId: req.body.habitId}}, function (err) {
        if (err) return 'err';

         console.log('success');
    });
    res.send('ok')
};