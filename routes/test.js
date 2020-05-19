const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/test');

const config = require('config-lite')(__dirname);

router.get('/test' , function(req, res,) {
    Promise.all([
            userModel.getAllUsers(),
        ]
    )

        .then(function(result){
            let userList = [];
            userList = result[0];
            console.log(userList);
            res.render('test' , {
                userList : userList,
            });
        })

});

router.get('/test' , function(req, res,) {
    Promise.all([
            userModel.getAllUsers(),
        ]
    )

        .then(function(result){
            let userList = [];
            userList = result[0];
            console.log(userList);
            res.render('test' , {
                userList : userList,
            });
        })

});








module.exports = router;
