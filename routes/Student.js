const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const groupinformation = require('../models/group');
const mongo = require('../lib/mongo');
const markinginformation=require('../models/groupmarking');
const config = require('config-lite')(__dirname);
const groupModel = require('../models/group');
router.get('/SHomePage', function(req, res) {
    res.render('SHomePage',{
        currentUserName:req.session.user.userName,
    } );
});

router.get('/SGroupMarking', function(req, res) {
    var thisID='5ec16a867714977fa9470f29';
    let names=new Array();
    Promise.all([
        markinginformation.getstudentmarkingByGroupID(thisID)
        //groupinformation.getgroupsByGroupID("5ec28a5ff145e85cca4e1b5f")
    ])
        .then( function (result) {
            let messageList=[];
            messageList=result[0];
            //console.log(messageList);
            let a=[];
            a=messageList[0];
            //console.log(a.groupID);
            groupinformation.getgroupsByGroupID(a.groupID)
                .then(function (result) {
                    console.log(result);
                    userModel.getUserbyID(result.member1ID)
                        .then(function (result) {
                           // console.log(result);
                            //console.log(result.userName);
                            names.push(result.userName);
                        });

                    userModel.getUserbyID(result.member2ID)
                        .then(function (result) {
                            //console.log(result);
                            //console.log(result.userName);
                            names.push(result.userName);
                        });


                    userModel.getUserbyID(result.member3ID)
                        .then(function (result) {
                            //console.log(result);
                            //console.log(result.userName);
                            names.push(result.userName);
                        });
                    userModel.getUserbyID(result.member4ID)
                        .then(function (result) {
                            //console.log(result);
                            //console.log(result.userName);
                            names.push(result.userName);
                        });

                    userModel.getUserbyID(result.member5ID)
                        .then(function (result) {
                            //console.log(result);
                            //console.log(result.userName);
                            names.push(result.userName);
                            //console.log(result.member6ID==thisID)
                        });

                    //console.log(result.member6ID!=thisID);
                    userModel.getUserbyID(result.member6ID)
                        .then(function (result) {
                            //console.log(result);
                            //console.log(result.userName);
                            names.push(result.userName);
                            var name1=names[5];
                            //console.log('------------------------------------------')
                            console.log(name1);
                            res.render('SGroupMarking',{
                                names : names,
                                currentUserName:req.session.user.userName,
                            });
                        });
                    //res.render('FGroupMarking',{});
                });
        });
});

router.post('/SGroupMarking',function (req,res){
    console.log(req.body.mark1);
    console.log(req.body.content1);
    console.log(req.body.mark2);
    console.log(req.body.content2);
    console.log(req.body.mark3);
    console.log(req.body.content3);
    console.log(req.body.mark4);
    console.log(req.body.content4);
    console.log(req.body.mark5);
    console.log(req.body.content5);
    console.log(req.body.mark6);
    console.log(req.body.content6);
    console.log(req.body.comment);
    var thisID='5ec16a867714977fa9470f29';
    markinginformation.getstudentmarkingByGroupID(thisID)
        .then(function (result){
            groupinformation.getgroupsByGroupID(result[0].groupID)
                .then(function (result){
                    markinginformation.getstudentmarkingByGroupID(result.member1ID)
                        .then(function (result){
                            console.log(result[0]);
                            let mark=result[0].mark;
                            var grade=req.body.mark1;
                            if(grade>100){
                                grade=100;
                            }
                            if(grade<0){
                                grade=0;
                            }
                            mark.push(grade);
                            console.log(mark);
                            let comment=result[0].comment;
                            if(req.body.content1!=null){
                                comment.push(req.body.content1);
                            }
                            //console.log(comment);


                        });
                });

        });


    res.render('SHomePage',{
        currentUserName:req.session.user.userName,
    } );

});


router.get('/SSelectMember', function(req, res) {
    res.render('SSelectMember',{
        currentUserName:req.session.user.userName,
    } );
});

router.get('/SSelectProject', function(req, res) {
    res.render('SSelectProject',{
        currentUserName:req.session.user.userName,
    } );
});

router.get('/SShowGrade', function(req, res) {
    res.render('SShowGrade',{messageList:'' } );
});

module.exports = router;
