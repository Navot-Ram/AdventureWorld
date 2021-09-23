const mongoose = require('mongoose');
const Locus = require('../models/Locus');
const cities = require('./cities');
const { sessions, characters, locations } = require('./Sessions');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/AdventureWorld', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

const seedDB = async () => {
    await Locus.deleteMany({});
    for (let i = 0; i < 125; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        let randSession = getRandomInt(1, 71);
        const loci = new Locus({
            author: '61462356dac5f77138a654ab',
            title: `${random_item(sessions)}`,
            session: randSession,
            geometry: {
                coordinates: [`${cities[random1000].longitude}`, `${cities[random1000].latitude}`],
                type: 'Point'
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddduyaru0/image/upload/v1632213021/Adventures/jak5zqzrn8kn9spuy3od.jpg',
                    filename: 'Adventures/jak5zqzrn8kn9spuy3od ',
                },
                {
                    url: 'https://res.cloudinary.com/ddduyaru0/image/upload/v1632212257/Adventures/czjvkmtsmzyeqsebqiyx.jpg',
                    filename: 'Adventures/czjvkmtsmzyeqsebqiyx',
                }
            ],
            city: `${cities[random1000].city}, ${cities[random1000].state}`,
            location: `${random_item(locations)}`,
            characters: [`${random_item(characters)}`, `${random_item(characters)}`, `${random_item(characters)}`, `${random_item(characters)}`, `${random_item(characters)}`],
        })
        await loci.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})