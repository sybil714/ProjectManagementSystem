var express = require('express');
var router = express.Router();
const userModel = require('../models/user');
const mongo = require('../lib/mongo');
const groupModel = require('../models/group');


router.get('/SMyGroup', function(req, res) {
    var username=req.session.user.userName;

    var userId = req.session.user._id;
    console.log(userId);
    let names=new Array();
    let emails=new Array();


    userModel.getNoGroupUsersByRole('Student')
        .then(function (result) {
            console.log(req.session.user._id)
            console.log(result[0]._id)
            console.log(result[1]._id)
            console.log(result[2]._id)
            console.log(result[3]._id)
            console.log(result[4]._id)
            console.log(result[5]._id)
            console.log(result[6]._id)

            for(var i= 0;i<result.length;i++){
                console.log(req.session.user._id==result[i]._id)
                if(req.session.user._id==result[i]._id){
                    return res.render('SMyGroup', {
                        tips: "You have not been assigned to a group!",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }
            }
        })


     groupModel.getGroupsByObjectId1(userId)
        .then(function (result){
       //   console.log(result);

            if(result!=null){
                if(result.member6ID!== null) {

                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = result.member6ID.userName;

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = result.member6ID.email;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }else{
                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = null

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = null;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }
            }else{

            }
        })



    groupModel.getGroupsByObjectId2(userId)
        .then(function (result){
          //  console.log(result);
            if(result!=null){
                if(result.member6ID!== null) {

                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = result.member6ID.userName;

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = result.member6ID.email;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }else{
                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = null

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = null;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }

            }else{

            }
         //   console.log(result);
        })


    groupModel.getGroupsByObjectId3(userId)
        .then(function (result){
         //   console.log(result);
            if(result!=null){
                if(result.member6ID!== null) {

                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = result.member6ID.userName;

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = result.member6ID.email;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }else{
                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = null

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = null;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }

            }else{

            }
          //  console.log(result);
        })


    groupModel.getGroupsByObjectId4(userId)
        .then(function (result){
         //   console.log(result);
            if(result!=null){
                if(result.member6ID!== null) {

                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = result.member6ID.userName;

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = result.member6ID.email;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }else{
                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = null

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = null;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }

            }else{

            }
         //   console.log(result);
        })


    groupModel.getGroupsByObjectId5(userId)
        .then(function (result){
          //  console.log(result);
            if(result!=null){
                if(result.member6ID!== null) {

                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = result.member6ID.userName;

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = result.member6ID.email;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }else{
                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = null

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = null;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }

            }else{

            }

        })


    groupModel.getGroupsByObjectId6(userId)
        .then(function (result){
           // console.log(result);
            if(result!=null){
                if(result.member6ID!== null) {

                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = result.member6ID.userName;

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = result.member6ID.email;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }else{
                    names[0] = result.groupName;
                    names[1] = result.facilitator.userName;
                    names[2] = result.project.projectName;
                    names[3] = result.member1ID.userName;
                    names[4] = result.member2ID.userName;
                    names[5] = result.member3ID.userName;
                    names[6] = result.member4ID.userName;
                    names[7] = result.member5ID.userName;
                    names[8] = null

                    emails[0] = result.member1ID.email;
                    emails[1] = result.member2ID.email;
                    emails[2] = result.member3ID.email;
                    emails[3] = result.member4ID.email;
                    emails[4] = result.member5ID.email;
                    emails[5] = null;

                    res.render('SMyGroup', {
                        tips: "",
                        names: names,
                        emails: emails,
                        currentUserName: username,
                    });
                }

            }else{

            }
        })





});

//var listResult = []
//             // console.log(result[1][7])
//             // console.log(result[1][7]===result[0][0].member1ID)
//             // console.log(result[0][0].member1ID)
//             var counter = 0
//             if (role === 'Student') {
//
//                 for (var i = 0; i < result[1].length; i++) {
//                     var queryResult = true
//                     for (var j = 0; j < result[0].length; j++) {
//
//                         if (!result[0][j].member6ID) {
//                             var judge = result[1][i]._id.equals(result[0]


module.exports = router;
