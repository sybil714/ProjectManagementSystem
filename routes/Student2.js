var express = require('express');
var router = express.Router();
const userModel = require('../models/user');
const mongo = require('../lib/mongo');
const groupModel = require('../models/group');


router.get('/SMyGroup', function(req, res) {
    var username=req.session.user.userName;
    res.render('SMyGroup',{currentUserName:username } );
    var userId = req.session.user._id;
    console.log(userId);

    groupModel.getGroupsByObjectId1(userId)
        .then(function (result){
            console.log(result);
            if(result!=null){
                result.member1ID
            }
        })
    groupModel.getGroupsByObjectId2(userId)
        .then(function (result){
            console.log(result);
        })
    groupModel.getGroupsByObjectId3(userId)
        .then(function (result){
            console.log(result);
        })
    groupModel.getGroupsByObjectId4(userId)
        .then(function (result){
            console.log(result);
        })
    groupModel.getGroupsByObjectId5(userId)
        .then(function (result){
            console.log(result);
        })
    groupModel.getGroupsByObjectId6(userId)
        .then(function (result){
            console.log(result);
        })

});




module.exports = router;
