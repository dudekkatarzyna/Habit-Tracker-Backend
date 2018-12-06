const redirectToHomeIfNotLoggedInAsAdmin = (req, res, next) => {

    console.log("redirectToHomeIfNotLoggedInAsAdmin")
    console.log(req.session.isAdmin)


    if (!req.session.isAdmin) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

module.exports = redirectToHomeIfNotLoggedInAsAdmin;