const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LocusSchema = new Schema({
    title: String,
    session: Number,
    song: String,
    description: String,
    location: String,
})