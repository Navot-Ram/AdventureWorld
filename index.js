const express = require('express');
const path = require('path');
const Locus = require('./models/Locus');
const { sessions, characters, locations } = require('./seeds/Sessions');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { locusSchema } = require('./schemas');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateLocation = (req, res, next) => {

    const { error } = locusSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.get('/adventures', catchAsync(async (req, res) => {
    const loci = await Locus.find({});
    res.render('./locations/index', { loci });
}))

app.get('/adventures/new', (req, res) => {
    res.render('./locations/new', { characters });
})

app.post('/adventures', validateLocation, catchAsync(async (req, res) => {
    const loci = new Locus(req.body.location);
    await loci.save();
    res.redirect(`/adventures/${loci._id}`)
}))

app.get('/adventures/:id', catchAsync(async (req, res) => {
    const locus = await Locus.findById(req.params.id)
    res.render('locations/location', { locus });
}))

app.get('/adventures/:id/edit', catchAsync(async (req, res) => {
    const locus = await Locus.findById(req.params.id)
    const master = {
        loc: locus,
        char: characters
    }
    res.render('locations/edit', { master });
}))

app.put('/adventures/:id', validateLocation, catchAsync(async (req, res) => {
    const { id } = req.params;
    const loci = await Locus.findByIdAndUpdate(id, { ...req.body.location });
    res.redirect(`/adventures/${loci._id}`)
}))


app.delete('/adventures/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Locus.findByIdAndDelete(id);
    res.redirect('/adventures');
}))


app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found!', 404))
})

app.use((err, req, res, next) => {
    const { statCode = 500 } = err;
    if (!err.message) err.message = "Oh no! something went wrong!";
    res.status(statCode).render('error', { err })
})
app.listen(3000, () => {
    console.log("Listening to the Rage on 3000!");
})