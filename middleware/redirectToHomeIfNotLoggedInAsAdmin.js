const user_details = require("../controllers/user");

const redirectToHomeIfNotLoggedInAsAdmin = (req, res, next) => {

    //TODO: check if flag admin true, find user bu userId

    //console.log(req.session.userId)

    if (req.session.userId !== '5c04318cbf066933e4a000c5') {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

module.exports = redirectToHomeIfNotLoggedInAsAdmin;