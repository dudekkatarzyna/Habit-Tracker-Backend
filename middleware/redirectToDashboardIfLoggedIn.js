const redirectToDashboardIfLoggedIn = (req, res, next) => {
    if (req.session.userId && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

module.exports = redirectToDashboardIfLoggedIn;