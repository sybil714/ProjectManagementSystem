const express = require('express');
const router = express.Router();
const mongo = require('../lib/mongo');
const projects = mongo.projects;
const feedbacks = mongo.feedbacks;
const messageModel = require('../models/message');
const projectModel=require('../models/project');
const groupModel=require('../models/group');
const URL=require('url');
const messages=mongo.messages;


/* GET homepage . */
/*
This page is for client to publish the project
 GET project . */
router.get('/CHomePage',function (req,res) {
    var username=req.session.user.userName;
    res.render('CHomePage',{currentUserName:username})
});

router.get('/CProjectRelease',function (req,res) {
    var username=req.session.user.userName;
    var url=URL.parse(req.url,true).query;
    var getProjectID=url.projectID;
    // console.log(getProjectID)
    if(!getProjectID){
        var projectList={

        }
        var messageList={

        }

        res.render('CProjectRelease' , {
            currentUserName:username,
            messageList : projectList,
            project:messageList,
        });
    }else{
        Promise.all([
        messageModel.getMessageByProjectID(getProjectID),
        projectModel.getProjectByProjectID(getProjectID)
    ])
        .then( function (result) {

            let messageList=[];
            messageList=result[0];
          // console.log(result[1])
            res.render('CProjectRelease' , {
                currentUserName:username,
                messageList : messageList,
                project:result[1],
            });

        })}

});


router.post('/CProjectRelease' , function(req, res,next) {
    var url=URL.parse(req.url,true).query;
    var getProjectID=url.projectID;
    if(!getProjectID){
        var data = {
            publisherID:req.session.user._id,
            projectName: req.body.projectName,
            projectContent: req.body.projectContent,
            grade:'-',
            status:'Pending'
        }

        var project = new projects(data)
        project.save(function (err,res) {
            //res.send(JSON.stringify(data))
            //console.log(data)
        })
        console.log(data)
        res.redirect('/CProjectManagement');

    } else{

        console.log(req.body.commentSubmit)
        if(req.body.commentSubmit) {
           // console.log(getProjectID);
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            var date = day + '/' + month + '/ ' + year + '  ' + hour + ':' + minute + ':' + second;
            //console.log(date)
            var commentData = {
                projectID: getProjectID,
                senderID: req.session.user._id,
                content: req.body.comment,
                date: date,
            };
           // console.log(commentData)
            if(commentData.content!==''){
            var message = new messages(commentData)
            message.save(function (err, res) {
            })
            }
            var returnURL = '/CProjectRelease?' + URL.parse(req.url).query;
            res.redirect(returnURL)

        }

    if(!req.body.commentSubmit) {
        projectModel.getProjectByProjectID(getProjectID)
            .then(function (result) {
                //console.log(result.projectName)
                var originalData = {
                    projectName: result.projectName,
                    projectContent: result.projectContent,
                };
                //console.log(originalData);
                var newData = {
                    projectName: req.body.projectName,
                    projectContent: req.body.projectContent,
                };

                projects.updateOne(originalData, newData, function (err, res) {
                    if (err) {
                        //console.log(err);
                        return;
                    }
                    console.log('Update success!');
                });
                var returnURL = '/CProjectRelease?' + URL.parse(req.url).query;
                res.redirect(returnURL)
            })
    }


    }



    });





router.get('/CProjectManagement' , function(req, res,) {
    var username=req.session.user.userName;
    Promise.all([
        projectModel.getProjectByPublishID(req.session.user._id)
    ])
        .then(function (result) {
           // console.log(result)
            if (!result[0][0]) {
                var projectList=[{
                    _id:null,
                    projectName: null,
                    projectContent:'',
                }]

                res.render('CProjectManagement', {
                    currentUserName:username,
                    projectList: projectList,
                });
            } else {
            //console.log(result)
            res.render('CProjectManagement', {
                currentUserName:username,
                projectList: result[0],
            });
            }
        });

    req.query.projectID;
});


/* GET feedback . */
/*This Page is for client to mark the team's performance
 */
router.get('/CFeedback',function (req,res) {

    var userId=req.session.user._id;



    projectModel.getProjectByPublishID(userId).then(function (result0) {
     var  projectId=result0[0]
        groupModel.getGroupsByProjectId(projectId)
        .then(function (result) {
            console.log(result.groupName)
            if(!result){
                 return  res.render('CFeedback',{
                    currentUserName:req.session.user.userName,
                    groupList:'',
                    tips: ' '
                })

            }else{
            return  res.render('CFeedback',{
                currentUserName:req.session.user.userName,
                groupList:result,
                tips: ' '
            })}
        })
    })
});

router.post('/CFeedback' , function(req, res,next) {
    var username=req.session.user.userName;
    var data2 = {
        clientID:req.session.user._id,
        mark1: req.body.mark1,
        ReasonQ1: req.body.ReasonQ1,
        mark2: req.body.mark2,
        ReasonQ2: req.body.ReasonQ2,
        mark3: req.body.mark3,
        ReasonQ3: req.body.ReasonQ3,
        mark4: req.body.mark4,
        ReasonQ4: req.body.ReasonQ4,
        Comments: req.body.Comments,
    }
/*
   To see What exactly is the input of client
 */
    var mark1in=data2.mark1;
    var mark2in=data2.mark2;
    var mark3in=data2.mark3;
    var mark4in=data2.mark4;
    var ReasonQ1in=data2.ReasonQ1;
    var ReasonQ2in=data2.ReasonQ2;
    var ReasonQ3in=data2.ReasonQ3;
    var ReasonQ4in=data2.ReasonQ4;
    console.log(!mark1in)
    console.log(mark1in)
    console.log(mark1in>3)
/*
  If the client misses a marking, the submission will be unsuccessful and a prompt will pop up
 */
    if(!mark1in||!mark2in||!mark3in||!mark4in) {
        console.log('* Your form has not been completed, please submit it after completion!')
       return res.render('CFeedback', {
           tips: '* Your form has not been completed, please submit it after completion!',
           currentUserName:username,
       })
    }


/*
 else if the mark is below 5，client must give some comments，then the submission will be successful
 */
    if(mark1in<5&&!ReasonQ1in||mark2in<5&&!ReasonQ2in||mark3in<5&&!ReasonQ3in||mark4in<5&&!ReasonQ4in){
        console.log('* Please give some comments if the mark is below 5!')
        return res.render('CFeedback', {tips: '* Please give some comments if the mark is below 5!'})
    }

     else{
         var feedback = new feedbacks(data2)

        feedback.save(function (err, res) {

            console.log(data2)

        })
        res.redirect('/CHomePage')
     }

});


module.exports = router;