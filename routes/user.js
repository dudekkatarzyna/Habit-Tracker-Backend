const express = require('express');
const router = express.Router();

const User = require('../models/user');

const user_controller = require('../controllers/user');
const sessionChecker = require('../index');

 router.get('/test', user_controller.test);
module.exports = router;

router.post('/create', user_controller.user_create);

router.get('/userList', user_controller.user_list);

router.get('/:id', user_controller.user_details);

router.put('/:id/update', user_controller.user_update);

router.delete('/:id/delete', user_controller.user_delete);
//
// router.get('/login', sessionChecker, (req, res) => {
//         res.sendFile(__dirname + '/public/login.html');
//     })

//
// router.post('/login',  (req, res, next)=> {
//     if (req.body.username && req.body.password) {
//         User.authenticate(req.body.username, req.body.password, function (error, user) {
//             if (error || !user) {
//                 let err = new Error('Wrong username or password.');
//                 err.status = 401;
//                 return next(err);
//             } else {
//                 req.session.userId = user._id;
//                 return res.redirect('/');
//             }
//         });
//     } else {
//         var err = new Error('All fields required.');
//         err.status = 400;
//         return next(err);
//     }
// });
//
// router.get('/isLogged',(req, res, next) =>{
//
//     console.log("isLogged");
//     var buttonText = document.getElementById("loginNavi").firstChild;
//     // if (req.session.userId != null) {
//     //     console.log("Logged in");
//     //     buttonText.data = "Logged in";
//     // }
//
//     return "ok"
// });