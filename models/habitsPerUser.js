const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HabitsPerUserSchema = new Schema({
    userId: {type: String, required: false, max: 100},
    name: {type: String, required: false, max: 100},
    categoryId: {type: String, required: false, max: 100},
    done: [{type: Date, required: false}]
});

// Export the model
module.exports = mongoose.model('HabitsPerUsers', HabitsPerUserSchema);