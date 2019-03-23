const redirectToDashboardOrAdminIfLoggedIn = (req, res, next) => {
    console.log("hej")
    console.log(req.session.userId)
    console.log(req.cookies.user_sid)
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