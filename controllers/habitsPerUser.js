const JWT = require('./JWT');
const HabitsPerUser = require('../models/habitsPerUser');
const User = require('../models/user')
const user_controller = require('../controllers/user');
const category_controller = require('../controllers/category');

exports.hpu_create = function (req, res, next) {


    console.log(req.session)
    console.log(req.body)

    let habitsPerUser = new HabitsPerUser(
        {
            userId: req.body.userId,
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
    });

//console.log(req)
    if (!req.body.isAdmin) {
        user_controller.user_update(habitsPerUser);
    }

    res.send(habitsPerUser);
};

exports.hpu_details = function (req, res, next) {

    //  console.log(req.get("Authorization"))

  //  console.log('jwt ', req.get("Authorization"))
    const decoded = JWT.verify(req.get("Authorization"))

    //console.log('userId', decoded)

    User.findById(decoded.userId, function (err, user) {
        if (err) return next(err);
        console.log('user: ' + user)

        const habits=user.habitsPerUserId;
        if (habits.includes(req.params.id) || decoded.isAdmin) {

            HabitsPerUser.findById(req.params.id, function (err, habitsPerUser) {
                if (err) return next(err);
                res.send(habitsPerUser);
            });
        } else {
            res.send(null);
        }



    });


};

exports.hpu_update = function (req, res, next) {

    console.log(req.params.id)
    console.log(req.body.date)
    HabitsPerUser.findByIdAndUpdate(req.params.id, {$push: {done: req.body.date}}, {new: true}, function (err, doc) {
        if (err) return next(err);
        console.log(doc)
        res.send('HabitsPerUser udpated.');
    });
};

exports.hpu_delete = function (req, res) {

    HabitsPerUser.findByIdAndRemove(req.params.id, function (err) {
        if (err) return 'error';

        //res.send('Deleted successfully!');
    });
};


exports.hpu_list = function (req, res, next) {

    HabitsPerUser.find({}, function (err, habits) {
        const habitsMap = {};

        habits.forEach(function (habit) {

            habitsMap[habit._id] = habit;


        });
        res.send(habitsMap);
    });
};

exports.hpu_topCategories = async function (req, res, next) {


    const response = await category_controller.category_list(req, res, next);
    console.log('response', response);

    let categoryValue = [0, 0, 0, 0];
    HabitsPerUser.find({}, function (err, habits) {


        habits.forEach(function (habit) {

            for (let j = 0; j < 4; j++) {
                // console.log(habit.categoryId, response[j]._id);
                //console.log(categoryValue[j]);
                if (!(habit.categoryId).localeCompare(response[j]._id)) {
                    categoryValue[j] = categoryValue[j] + 1;
                    //   console.log('match', habit.categoryId, response[j]._id);
                }
            }


        });

        var dict = {};
        dict[response[0].name] = categoryValue[0];
        dict[response[1].name] = categoryValue[1];
        dict[response[2].name] = categoryValue[2];
        dict[response[3].name] = categoryValue[3];

        console.log(dict);

        var items = Object.keys(dict).map(function (key) {
            return [key, dict[key]];
        });

        items.sort(function (first, second) {
            return second[1] - first[1];
        });

// Create a new array with only the first 5 items
        //  console.log(items)
        //  console.log(items.slice(0, 3));


        res.send(items.slice(0, 3));
    });


};
