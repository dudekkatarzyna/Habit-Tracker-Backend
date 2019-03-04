const mongoose = require('mongoose');

const User = require('../models/user');
const Category = require('../models/category');
const Habit = require('../models/habitsPerUser');

exports.database_stats = async function (req, res, next) {

    console.log("here")
    const db=mongoose.connection;

    const responseUser = await User.collection.stats();
    console.log(responseUser.count);

    const responseHabit = await Habit.collection.stats();
    console.log(responseHabit.count);

    const responseCategory = await Category.collection.stats();
    console.log(responseCategory.count);

    return responseUser;
};

exports.user_count = async function (req, res, next) {

    const responseUser = await User.collection.stats();
  //  console.log(responseUser.count);

    res.send(responseUser);
};
exports.habit_count = async function (req, res, next) {

    const responseHabit = await Habit.collection.stats();
 //   console.log(responseHabit.count);

    res.send(responseHabit);
};
exports.category_count = async function (req, res, next) {

    const responseCategory = await Category.collection.stats();
  //  console.log(responseCategory.count);

    res.send(responseCategory);
};