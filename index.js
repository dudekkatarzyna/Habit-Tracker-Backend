const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const User = require('./models/user');
const habitsPerUser = require('./routes/habitsPerUser');
const redirectToDashboardIfLoggedIn = require('./middleware/redirectToDashboardIfLoggedIn');
const redirectToHomeIfNotLoggedIn = require('./middleware/redirectToHomeIfNotLoggedIn');
const user_controller = require('./controllers/user');
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://kdudek:123abc@ds125423.mlab.com:25423/mes';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//app.use('/', express.static('public'));
app.use('/resources', express.static('public/resources'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//use sessions for tracking logins
app.use(expressSession({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

// route for Home-Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

});

//ten sssion checker musi wyjebywać użytkownika do strony głównej jesli jest nie zalogowany
app.get('/dashboard', redirectToHomeIfNotLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

app.use('/user', userRoute);
app.use('/habitsPerUser', habitsPerUser);
const port = 8082;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.route('/login')
    .get(redirectToDashboardIfLoggedIn, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;


        User.authenticate(username, password, function (error, user) {
            if (error || !user) {
                res.redirect(401, '/login');
            } else {
                req.session.userId = user._id;
                //change button to logout

                res.redirect('/dashboard');
            }

        });
    });

app.route('/register')
    .get(redirectToDashboardIfLoggedIn, (req, res) => {
        res.sendFile(__dirname + '/public/register.html');
    })
    .post((req, res) => {
        console.log("post");
        user_controller.user_create(req, res)
            .then(user => {
                console.log("id:",user._id);
                req.session.userId = user._id;
                res.redirect('/dashboard');
            })
            .catch(error => {

                res.redirect(error.status || 406, '/register');

            });

    });
// .then(function (response){
//
//     req.session.user = req.user.dataValues;
//     res.redirect('/dashboard');
// })
// .catch(error => {
//     res.redirect('/register');
// });


//module.exports=isNotLoggedIn;