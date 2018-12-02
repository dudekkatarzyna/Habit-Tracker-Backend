const HabitsPerUser = require('../models/habitsPerUser');


exports. hpu_create = function (req, res, next) {
    console.log(req.body);
    let habitsPerUser = new HabitsPerUser(
        {
            id: req.body.id,
            name: req.body.name,
            categoryId: req.body.categoryId,
            done: [new Date().getTime()]
        }
    );

    habitsPerUser.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Habit Created successfully')
    })
};

exports.hpu_details = function (req, res, next) {
    HabitsPerUser.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.hpu_update = function (req, res, next) {
    HabitsPerUser.findByIdAndUpdate(req.params.id, {$push: req.body}, function (err) {
        console.log(req.body)
        if (err) return next(err);
        res.send('HabitsPerUser udpated.');
    });
};

exports.hpu_delete = function (req, res) {
    HabitsPerUser.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};


exports.hpu_list = function (req, res, next) {

    HabitsPerUser.find({}, function(err, habits) {
        var habitsMap = {};

        habits.forEach(function(habit) {
            habitsMap[habit._id] = habit;
        });
        res.send(habitsMap);
    });
};