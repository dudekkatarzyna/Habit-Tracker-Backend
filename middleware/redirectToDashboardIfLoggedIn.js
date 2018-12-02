const redirectToDashboardIfLoggedIn = (req, res, next) => {
    if (req.session.userId && req.cookies.user_sid) {

        //zmiana guzika login na log out

        res.redirect('/dashboard');
    } else {
        next();
    }
};

module.exports = redirectToDashboardIfLoggedIn;