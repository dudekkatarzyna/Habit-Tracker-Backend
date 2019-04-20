const redirectToDashboardOrAdminIfLoggedIn = (req, res, next) => {

    if (req.session.userId) {
        
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