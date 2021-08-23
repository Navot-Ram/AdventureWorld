const express = require('express');
const path = require('path');
const Locus = require('./models/Locus');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/adventures', async (req, res) => {
    const loci = await Locus.find({});
    res.render('./locations/index', { loci });
})


app.get('/adventures/new', (req, res) => {
    res.render('./locations/new');
})

app.post('/adventures', async (req, res) => {
    const loci = new Locus(req.body.location);
    await loci.save();
    res.redirect(`/adventures/${loci._id}`)
})

app.get('/adventures/:id', async (req, res) => {
    const locus = await Locus.findById(req.params.id)
    res.render('locations/location', { locus });
})

app.get('/adventures/:id/edit', async (req, res) => {
    const locus = await Locus.findById(req.params.id)
    res.render('locations/edit', { locus });
})

app.put('/adventures/:id', async (req, res) => {
    const { id } = req.params;

    const loci = await Locus.findByIdAndUpdate(id, { ...req.body.location });
    res.redirect(`/adventures/${loci._id}`)
});


app.delete('/adventures/:id', async (req, res) => {
    const { id } = req.params;
    await Locus.findByIdAndDelete(id);
    res.redirect('/adventures');
})


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makelocus', async (req, res) => {
    const camp = new Locus({ title: 'Idaho' });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log("Listening to the Rage on 3000!");
})