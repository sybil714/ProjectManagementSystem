const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const messageModel = require('../models/message');
const projectModel=require('../models/project');
const config = require('config-lite')(__dirname);



router.get('/MLViewProject' , function(req, res,) {

    Promise.all([
        messageModel.getMessageByProjectID("5ec28a5ff145e85cca4e1b5f"),
        projectModel.getProjectByProjectID("5ec28a5ff145e85cca4e1b5f")
    ])
        .then( function (result) {
            let messageList=[];
            messageList=result[0];
            console.log(result[1])
            res.render('MLViewProject' , {
                messageList : messageList,
                project:result[1],
            });
        })
});


module.exports = router;