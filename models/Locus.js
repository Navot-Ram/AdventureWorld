const mongoose = require('mongoose');
const story = require('./story');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})
const LocusSchema = new Schema({
    title: String,
    images: [ImageSchema],
    city: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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