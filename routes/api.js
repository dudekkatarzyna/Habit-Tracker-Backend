const express = require('express');
const router = express.Router();
// const api_controller = require('../controllers/session');

router.post('/hello', (req,res)=>{
    res.send('hello');
});

router.post('/user-count', (req,res)=>{
    res.send('5');
});



module.exports = router;

