const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: String,
    body: String,
    rank: Number,
})
module.exports = mongoose.model('Story', storySchema);