const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LocusSchema = new Schema({
    title: String,
    city: String,
    session: Number,
    song: String,
    description: String,
    location: String,
})

module.exports = mongoose.model('Locus', LocusSchema);