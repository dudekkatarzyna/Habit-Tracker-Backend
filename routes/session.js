const express = require('express');
const router = express.Router();
const session_controller = require('../controllers/session');

const redirectToDashboardIfLoggedIn = require('../middleware/redirectToDashboardIfLoggedIn');
const redirectToHomeIfNotLoggedIn = require('../middleware/redirectToHomeIfNotLoggedIn');
const redirectToHomeIfNotLoggedInAsAdmin = require('../middleware/redirectToHomeIfNotLoggedInAsAdmin');


router.get('/', redirectToDashboardIfLoggedIn, session_controller.homePage)

router.get('/dashboard', redirectToHomeIfNotLoggedIn, session_controller.dashboard)

router.get('/admin', redirectToHomeIfNotLoggedInAsAdmin, session_controller.admin)

router.get('/login', session_controller.getLogin);

router.post('/login', redirectToDashboardIfLoggedIn, session_controller.postLogin);

router.get('/register', session_controller.getRegister);

router.post('/register', session_controller.postRegister);

router.get('/logout', session_controller.logout);

module.exports = router;

