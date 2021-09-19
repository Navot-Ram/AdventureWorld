const mongoose = require('mongoose');
const story = require('./story');
const Schema = mongoose.Schema;

const LocusSchema = new Schema({
    title: String,
    image: String,
    city: String,
    characters: Array,
    session: Number,
    song: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    stories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Story',
        }
    ]
})

LocusSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await story.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Locus', LocusSchema);