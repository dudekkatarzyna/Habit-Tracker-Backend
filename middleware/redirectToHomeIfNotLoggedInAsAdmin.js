const redirectToHomeIfNotLoggedInAsAdmin = (req, res, next) => {

    if (!req.session.isAdmin) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

module.exports = redirectToHomeIfNotLoggedInAsAdmin;