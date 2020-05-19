var express = require('express');
var router = express.Router();
const userModel = require('../models/user');

/* GET home page. */

router.get('/login',function (req,res) {
    res.render('Login',{})
});

router.get('/regist',function (req,res) {
    res.render('Registration',{})
});


router.post('/login',function (req,res) {
    var data = {
        userName: req.body.userName,
        password: req.body.password,
    }


});


module.exports = router;
