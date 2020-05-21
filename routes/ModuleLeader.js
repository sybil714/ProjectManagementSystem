const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongo = require('../lib/mongo');
const userModel = require('../models/user');
const messageModel = require('../models/message');
const projectModel=require('../models/project');
const config = require('config-lite')(__dirname);
const URL=require('url');
const markings = mongo.markings;
const messages=mongo.messages;

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

   // console.log(getProjectID)
    Promise.all([
        messageModel.getMessageByProjectID(getProjectID),
        projectModel.getProjectByProjectID(getProjectID)
    ])
        .then( function (result) {
            let messageList=[];
            messageList=result[0];
           // console.log(result[1])
            res.render('MLViewProject' , {
                messageList : messageList,
                project:result[1],
            });
        })
});


/**
 *This is the message function in the MLViewProject page.
 * The data is finally sent to the database by JSON format.
 */
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
    var date=day+'/'+month+'/ '+year+'  '+hour+':'+minute+':'+second;
    //console.log(date)
    var data = {
        projectID: getProjectID,
        senderID: req.session.user._id,
        content:req.body.comment,
        date:date,
    };

    console.log(data)
    if(data.content!==''){
    var message = new messages(data)
    message.save(function (err,res) {
    })}
    var returnURL='/MLViewProject?'+URL.parse(req.url).query;
    res.redirect(returnURL)
});


/**
 * The page of MLGroupMarking is written for module leader to mark student groups,
 * if the mark is below 5, it will record the reason
 */

router.get('/MLGroupMarking', function(req, res) {
    res.render('MLGroupMarking',{ } );
});

router.post('/MLGroupMarking' , function(req, res,next) {

    var data3 = {
        moduleLeaderID:req.session.user._id,
        mark1: req.body.mark1,
        reason1: req.body.reason1,
        mark2: req.body.mark2,
        reason2: req.body.reason2,
        mark3: req.body.mark3,
        reason3: req.body.reason3,
        mark4: req.body.mark4,
        reason4: req.body.reason4,
        Comments: req.body.Comments,
    }

    /*
       To see What exactly is the input of moudel leader
     */
    var mark1in=data3.mark1;
    var mark2in=data3.mark2;
    var mark3in=data3.mark3;
    var mark4in=data3.mark4;
    var reason1in=data3.reason1;
    var reason2in=data3.reason2;
    var reason3in=data3.reason3;
    var reason4in=data3.reason4;
    console.log(!mark1in)
    console.log(mark1in)
    console.log(mark1in>3)

    /*
      If the moudel leader misses a marking, the submission will be unsuccessful and a prompt will pop up
     */
    if(!mark1in||!mark2in||!mark3in||!mark4in) {
        console.log('* Your form has not been completed, please submit it after completion!')
        return res.render('CFeedback', {tips: '* Your form has not been completed, please submit it after completion!'})
    }


    /*
     else if the mark is below 5，module leader must give some comments，then the submission will be successful
     */
    if(mark1in<5&&!reason1in||mark2in<5&&!reason2in||mark3in<5&&!reason3in||mark4in<5&&!reason4in){
        console.log('* Please give some comments if the mark is below 5!')
        return res.render('CFeedback', {tips: '* Please give some comments if the mark is below 5!'})
    }

    else
    {
        var marking = new markings(data3)
        marking.save(function (err, res) {
            //res.send(JSON.stringify(data))
            console.log(data3)
        })
        res.redirect('/MLHomePage')
    }
});

router.get('/MLAnnouncement', function(req, res) {
    res.render('MLAnnouncement',{messageList:'' } );
});


module.exports = router;
