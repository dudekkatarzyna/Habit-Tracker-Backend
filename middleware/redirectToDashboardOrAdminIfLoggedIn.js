const redirectToDashboardOrAdminIfLoggedIn = (req, res, next) => {
    console.log("redirectToDashboardOrAdminIfLoggedIn")
    if (req.session.userId && req.cookies.user_sid) {

        if (req.session.isAdmin) {
            console.log("res.redirect('/admin');")
            res.redirect('/admin');
        } else {
            console.log("res.redirect('/dashboard');")
            res.redirect('/dashboard');
        }

    } else {
        next();
    }
};

module.exports = redirectToDashboardOrAdminIfLoggedIn;