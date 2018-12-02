const redirectToHomeIfNotLoggedIn = (req, res, next) => {
    console.log(req.session);
    if (req.session.userId && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = redirectToHomeIfNotLoggedIn;