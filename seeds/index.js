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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        let randSession = getRandomInt(1, 71);
        const loci = new Locus({
            title: `${random_item(sessions)}`,
            session: randSession,
            image: 'https://source.unsplash.com/1600x900/?wolf,raven,forest,idaho',
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