const redirectToHomeIfNotLoggedIn = (req, res, next) => {

    console.log("redirectToHomeIfNotLoggedIn")
    if (req.session.userId && req.cookies.user_sid) {
        console.log("next()")
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = redirectToHomeIfNotLoggedIn;