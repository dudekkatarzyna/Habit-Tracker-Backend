const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Category = new Schema({
    name: {type: String, required: false, max: 100},
});

module.exports = mongoose.model('Category', Category);
