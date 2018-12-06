const redirectToDashboardOrAdminIfLoggedIn = (req, res, next) => {
    if (req.session.userId && req.cookies.user_sid) {

        if (req.session.isAdmin) {
            res.redirect('/admin');
        } else {
            res.redirect('/dashboard');
        }

    } else {
        next();
    }
};

module.exports = redirectToDashboardOrAdminIfLoggedIn;