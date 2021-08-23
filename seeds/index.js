const mongoose = require('mongoose');
const Locus = require('../models/Locus');
const cities = require('./cities');
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

const seedDB = async () => {
    await Locus.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const loci = new Locus({
            title: `${sample(places)} ${sample(descriptors)}`,
            city: `${cities[random1000].city}, ${cities[random1000].state}`
        })
        await loci.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})