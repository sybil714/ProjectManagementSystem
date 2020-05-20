const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const messageModel = require('../models/message');
const projectModel=require('../models/project');
const config = require('config-lite')(__dirname);
const URL=require('url');

router.get('/MLGroupManagement', function(req, res) {
    res.render('MLGroupManagement',{ } );
});


router.get('/MLHomePage', function(req, res) {
    res.render('MLHomePage',{ } );
});



router.get('/MLProjectManagement', function(req, res) {
    Promise.all([
        projectModel.getAllProject()
    ])
        .then( function (result) {
           // console.log(result)
            res.render('MLProjectManagement' , {
                projectList : result[0],
            });
        })

    req.query.projectID;

});

/**
 *The page of MLViewProject is entered according to the hyperlink of MLProjectManagement page.
 *The content of MLViewProject is to get the project ID according to the URL provided by the hyperlink of MLProjectManagement page
 **/
router.get('/MLViewProject' , function(req, res,) {
    var url=URL.parse(req.url,true).query;
    var getProjectID=url.projectID;

    console.log(getProjectID)
    Promise.all([
        messageModel.getMessageByProjectID(getProjectID),
        projectModel.getProjectByProjectID(getProjectID)
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



router.post('/MLViewProject', function(req, res,){
    var url=URL.parse(req.url,true).query;
    var getProjectID=url.projectID;
    /****Test for getting a current time and date*****/
    var date=new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    console.log(year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second);
    var data = {
        projectID: getProjectID,
        senderID: req.session.user._id,
        content:req.body.comment,
    }
    console.log(data)


})


module.exports = router;
