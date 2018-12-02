const clearCookies = function (req, res, next) {
    if (req.cookies.user_sid && !req.session.userId) {
        res.clearCookie('user_sid');
    }
    next();
};

module.exports = clearCookies;