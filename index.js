const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStartegy = require('passport-local');
const User = require('./models/User');

const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const userRoutes = require('./routes/users');
const adventureRoutes = require('./routes/adventures');
const storyeRoutes = require('./routes/stories');

mongoose.connect('mongodb://localhost:27017/AdventureWorld', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'ThisIsNOSecretAtAll',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }

}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
/*
app.get('/makeUser', async (req, res) => {
    const user = new User({ email: 'ramnavot@gmail.com', username: 'Navot' });
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})
*/
app.use('/', userRoutes);
app.use('/adventures', adventureRoutes);
app.use('/adventures/:id/stories/', storyeRoutes);

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