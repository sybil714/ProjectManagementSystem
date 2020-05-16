const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');

const config = require('config-lite')(__dirname);

router.get('/login' , function(req, res,) {
    Promise.all([
            userModel.getAllUsers(),
        ]
    )
        .then(function(result){
            let userList = [];
            userList = result[0];
            //console.log(result);
            res.render('login' , {
                userList : userList,
            });
        })
});


module.exports = router;
