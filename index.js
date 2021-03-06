const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const clearCookies = require('./middleware/clearCookies');
const habitsPerUser = require('./routes/habitsPerUser');
const userRoute = require('./routes/user');
const apiRoute = require('./routes/api');
const category = require('./routes/category');
const database = require('./routes/database');
const sessionRoute = require('./routes/session');

const port = 8080;

const mongoose = require('mongoose');
const dev_db_url = 'mongodb://kdudek:123abc@ds125423.mlab.com:25423/mes';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const db = mongoose.connection;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    key: 'user_sid',
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
//app.use(clearCookies);
app.use('/', sessionRoute);
app.use('/api', apiRoute);
app.use('/user', userRoute);
app.use('/habitsPerUser', habitsPerUser);
app.use('/category', category);
app.use('/database', database);
app.use('/resources', express.static('public/resources'));


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});