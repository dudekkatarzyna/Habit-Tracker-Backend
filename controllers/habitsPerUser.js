const HabitsPerUser = require('../models/habitsPerUser');
const Category = require('../controllers/category')
const user_controller = require('../controllers/user');

exports. hpu_create = function (req, res, next) {
   // console.log(req.body);

    console.log(req.session)
    let habitsPerUser = new HabitsPerUser(
        {
            userId: req.session.userId,
            name: req.body.habitName,
            categoryId: req.body.category,
            done: []

        }
    );


    habitsPerUser.save(function (err) {
        if (err) {
            return next(err);
        }
     //  res.send('Habit Created successfully')
    })


    if(!req.session.isAdmin)
    {
        console.log("definitelt not an admin")
        user_controller.user_update(habitsPerUser);
    }

    res.send('Habit Created successfully');
};

exports.hpu_details = function (req, res, next) {
//    console.log("hpu_details")
    HabitsPerUser.findById(req.params.id, function (err, habitsPerUser) {
        if (err) return next(err);
        res.send(habitsPerUser);
    })
};

exports.hpu_update = function (req, res, next) {
    HabitsPerUser.findByIdAndUpdate(req.params.id, {$push: req.body}, function (err) {
     //   console.log(req.body)
        if (err) return next(err);
        res.send('HabitsPerUser udpated.');
    });
};

exports.hpu_delete = function (req, res) {

    HabitsPerUser.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);

        //res.send('Deleted successfully!');
    })
};


exports.hpu_list = function (req, res, next) {

    HabitsPerUser.find({}, function(err, habits) {
        var habitsMap = {};

        habits.forEach(function(habit) {


            console.log(habit.userId)
            console.log(req.session.userId)
            if(habit.userId === req.session.userId || req.session.isAdmin)
            {
                habitsMap[habit._id] = habit;
            }


        });
        res.send(habitsMap);
    });
};