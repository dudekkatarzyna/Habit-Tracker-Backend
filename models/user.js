const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let UserSchema = new Schema({
    username: {type: String, required: true, max: 100, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: false, max: 100},
    surname: {type: String, required: false, max: 100},
    habitsPerUserId: [{type: String, required: false}],
    admin: {type: Boolean, required: true}
});

UserSchema.plugin(uniqueValidator);

//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
    //console.log(username, password);
    User.findOne({username: username})
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                const error = new Error('User not found.');
                error.status = 401;
                return callback(error);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};


UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});


// Export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;