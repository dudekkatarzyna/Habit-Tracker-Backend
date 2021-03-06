const Category = require('../models/category');

exports.category_details = function (req, res, next) {
    console.log(req.params);

    Category.findById(req.params.id, function (err, category) {
        if (err) return next(err);
      //  console.log(category);
        //return category;
        res.send(category);
    });

};


exports.category_create = function (req, res, next) {

    console.log(req.body);
    let category = new Category(
        {
            name: req.body.name,
        }
    );

    category.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Habit Created successfully');
    });
};


exports.category_list = function (req, res, next) {

    let categoryMap = {};

    return Category.find({}, function(err, categories) {

        categories.forEach(function(habit) {
                categoryMap[habit._id] = habit;

        });

      //  console.log(categoryMap)
        return categoryMap;
    });

};
