const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongo = require('../lib/mongo');
const userModel = require('../models/user');
const messageModel = require('../models/message');
const projectModel=require('../models/project');
const groupModel=require('../models/group');
const config = require('config-lite')(__dirname);
const URL=require('url');
const markings = mongo.markings;
const messages=mongo.messages;
const projects = mongo.projects;
const groups=mongo.groups


router.get('/MLHomePage', function(req, res) {
    var username=req.session.user.userName;
    res.render('MLHomePage',{currentUserName:username } );
});



router.get('/MLProjectManagement', function(req, res) {
    var username=req.session.user.userName;
    Promise.all([
        projectModel.getAllProject()
    ])
        .then( function (result) {
           // console.log(result)
            res.render('MLProjectManagement' , {
                currentUserName:username,
                projectList : result[0],
            });
        });
    req.query.projectID;

});

/**
 *The page of MLViewProject is entered according to the hyperlink of MLProjectManagement page.
 *The content of MLViewProject is to get the project ID according to the URL provided by the hyperlink of MLProjectManagement page
 **/
router.get('/MLViewProject' , function(req, res,) {
    var username=req.session.user.userName;
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
                currentUserName:username,
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

    //console.log(data)
    if(data.content!==''&&!req.body.statusConfirm){
    var message = new messages(data)
    message.save(function (err,res) {
    })
    }

    if(req.body.statusConfirm){

                //console.log(originalData);
                var newStatus = {
                    status: req.body.status,
                };

                projects.findByIdAndUpdate(getProjectID, newStatus, function (err, res) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Update success!');
                });

    }
    var returnURL='/MLViewProject?'+URL.parse(req.url).query;
    res.redirect(returnURL)
});


/**
 * The page of MLGroupMarking is written for module leader to mark student groups,
 * if the mark is below 5, it will record the reason
 */

router.get('/MLGroupMarking', function(req, res) {
    var username=req.session.user.userName;
    res.render('MLGroupMarking',{ currentUserName:username} );
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

router.get('/MLViewCFeedback', function(req, res) {
    res.render('MLViewCFeedback',{messageList:'' } );
});

router.get('/MLAnnouncement', function(req, res) {
    var username=req.session.user.userName;
    res.render('MLAnnouncement',{
        currentUserName:username,
        messageList:''
    } );
});

router.get('/MLGroupManagement', function(req, res) {

    var url=URL.parse(req.url).query;
    console.log(url);//To show how does the URL looks like


    Promise.all([
        groupModel.getAllGroups(),
        userModel.getNoGroupUsersByRole('Facilitator'),
        userModel.getNoGroupUsersByRole('Student'),
        projectModel.getProjectByLimitedNum()
    ]).then(function (result) {

        var homeSetting= {
            currentUserName:req.session.user.userName,
            groupSelection:'---select a option below---',
            groupList:result[0],
            groupID:'',
            groupName:'',
            facilitatorList:result[1],
            memberList:result[2],
            projectList:result[3],
            facilitatorName:'',
            facilitatorID:'',
            facilitatorEmail:'',
            projectName:'',
            projectID:'',
            member1Name:'',
            member1ID:'',
            member1Email:'',
            member2Name:'',
            member2ID:'',
            member2Email:'',
            member3Name:'',
            member3ID:'',
            member3Email:'',
            member4Name:'',
            member4ID:'',
            member4Email:'',
            member5Name:'',
            member5ID:'',
            member5Email:'',
            member6Name:'',
            member6ID:'',
            member6Email:'',
        };

        if(!url){
            return    res.render('MLGroupManagement',homeSetting)
        }
        else{
            url=URL.parse(req.url,true).query;
            console.log()
            if(url.selectGroup==='toAddGroup'){
                homeSetting.groupID='toAddGroup'
                homeSetting.groupSelection='Please press Edit button and complete the form'
                return res.render('MLGroupManagement',homeSetting)
            }else if(url.selectGroup===''){
                homeSetting.groupName=''
                return res.render('MLGroupManagement',homeSetting)
            }
            Promise.all([
                groupModel.getAllGroups(),
                groupModel.getgroupsByGroupID(url.selectGroup),
                userModel.getNoGroupUsersByRole('Facilitator'),
                userModel.getNoGroupUsersByRole('Student'),
                projectModel.getProjectByLimitedNum()
            ]).then(function (result) {

               // console.log(result[3]);
                //console.log(result[1].facilitator.userName);
                //console.log(result[2])
                if(!result[1].facilitator||!result[1].member1ID||!result[1].member2ID||!result[1].member3ID||!result[1].member4ID||!result[1].member5ID||!result[1].project){
                    return   res.render('MLGroupManagement',{
                        currentUserName:req.session.user.userName,
                        groupSelection:result[1].groupName,
                        groupList:result[0],
                        groupID:result[1]._id,
                        groupName:result[1].groupName,
                        facilitatorList:result[2],
                        memberList:result[3],
                        projectList:result[4],
                        facilitatorName:'',
                        facilitatorID:'',
                        facilitatorEmail:'',
                        projectName:'',
                        projectID:'',
                        member1Name:'',
                        member1ID:'',
                        member1Email:'',
                        member2Name:'',
                        member2ID:'',
                        member2Email:'',
                        member3Name:'',
                        member3ID:'',
                        member3Email:'',
                        member4Name:'',
                        member4ID:'',
                        member4Email:'',
                        member5Name:'',
                        member5ID:'',
                        member5Email:'',
                        member6Name:'',
                        member6ID:'',
                        member6Email:'',
                    } );
                }else{
                    if(!result[1].member6ID){
                        return   res.render('MLGroupManagement',{
                            currentUserName:req.session.user.userName,
                            groupSelection:result[1].groupName,
                            groupList:result[0],
                            groupID:result[1]._id,
                            groupName:result[1].groupName,
                            facilitatorList:result[2],
                            memberList:result[3],
                            projectList:result[4],
                            facilitatorName:result[1].facilitator.userName,
                            facilitatorID:result[1].facilitator._id,
                            facilitatorEmail:result[1].facilitator.email,
                            projectName:result[1].project.projectName,
                            projectID:result[1].project._id,
                            member1Name:result[1].member1ID.userName,
                            member1ID:result[1].member1ID._id,
                            member1Email:result[1].member1ID.email,
                            member2Name:result[1].member2ID.userName,
                            member2ID:result[1].member2ID._id,
                            member2Email:result[1].member2ID.email,
                            member3Name:result[1].member3ID.userName,
                            member3ID:result[1].member3ID._id,
                            member3Email:result[1].member3ID.email,
                            member4Name:result[1].member4ID.userName,
                            member4ID:result[1].member4ID._id,
                            member4Email:result[1].member4ID.email,
                            member5Name:result[1].member5ID.userName,
                            member5ID:result[1].member5ID._id,
                            member5Email:result[1].member5ID.email,
                            member6Name:'',
                            member6ID:'',
                            member6Email:'',

                        } );
                    }else{
                        return   res.render('MLGroupManagement',{
                            currentUserName:req.session.user.userName,
                            groupSelection:result[1].groupName,
                            groupList:result[0],
                            groupID:result[1]._id,
                            groupName:result[1].groupName,
                            facilitatorList:result[2],
                            memberList:result[3],
                            projectList:result[4],
                            facilitatorName:result[1].facilitator.userName,
                            facilitatorID:result[1].facilitator._id,
                            facilitatorEmail:result[1].facilitator.email,
                            projectName:result[1].project.projectName,
                            projectID:result[1].project._id,
                            member1Name:result[1].member1ID.userName,
                            member1ID:result[1].member1ID._id,
                            member1Email:result[1].member1ID.email,
                            member2Name:result[1].member2ID.userName,
                            member2ID:result[1].member2ID._id,
                            member2Email:result[1].member2ID.email,
                            member3Name:result[1].member3ID.userName,
                            member3ID:result[1].member3ID._id,
                            member3Email:result[1].member3ID.email,
                            member4Name:result[1].member4ID.userName,
                            member4ID:result[1].member4ID._id,
                            member4Email:result[1].member4ID.email,
                            member5Name:result[1].member5ID.userName,
                            member5ID:result[1].member5ID._id,
                            member5Email:result[1].member5ID.email,
                            member6Name:result[1].member6ID.userName,
                            member6ID:result[1].member6ID._id,
                            member6Email:result[1].member6ID.email,
                        } );
                    }


                }



            });
        }
    })

});




router.post('/MLGroupManagement', function(req, res,){
   var groupSelect=req.body.selectGroup;
   //console.log(groupSelect)

});


module.exports = router;












