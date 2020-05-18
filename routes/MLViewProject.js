const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const messageModel = require('../models/message');
const config = require('config-lite')(__dirname);



router.get('/MLViewProject' , function(req, res,) {

    Promise.all([
        messageModel.getAll()
    ])
        .then( function (result) {
            console.log(result.senderID);
            res.render('MLViewProject' , {
                messageList : result,
            });
        })
});


module.exports = router;