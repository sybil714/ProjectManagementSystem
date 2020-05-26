const express = require('express');
const router = express.Router();
const mongo = require('../lib/mongo');
const assessments = mongo.assessments;
const userModel = require('../models/user');
const groupModel = require('../models/group');
const projectModel=require('../models/project');
const config = require('config-lite')(__dirname);
const URL=require('url');
const markings = mongo.markings;
const messages=mongo.messages;
const projects = mongo.projects;
const groups=mongo.groups;

/* GET homepage . */
router.get('/FHomePage', function(req, res) {
    var username=req.session.user.userName;
    res.render('FHomePage',{ currentUserName:username,} );
});

/*
 Get the feedback form facilitator
 */
router.get('/FGroupMarking',function (req,res) {
    var username=req.session.user.userName;
    var userId=req.session.user._id;;
    let groups=new Array();
    console.log(userId);

    groupModel.getGroupsByFId(userId)
        .then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    groups[i] = result[i].groupName;
                }
                console.log(result);
                console.log(result.length);
                console.log(groups);

                res.render('FGroupMarking', {
                    groups: groups,
                    currentUserName: username,
                    tips: '',
                });

        })
});

router.post('/FGroupMarking' , function(req, res,next) {
    var username=req.session.user.userName;
    var userId=req.session.user._id;;
    let groups=new Array();
    console.log(userId);

    groupModel.getGroupsByFId(userId)
        .then(function (result) {
            for (var i = 0; i < result.length; i++) {
                groups[i] = result[i].groupName;
            }
            console.log(result);
            console.log(result.length);
            console.log(groups);

            var data3 = {
                moduleLeaderID:req.session.user._id,
                groupID:req.body.groupID,
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
            var groupIDin=data3.groupID
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
            console.log(groupIDin)
            /*
              If the moudel leader misses a marking, the submission will be unsuccessful and a prompt will pop up
             */
            if(!mark1in||!mark2in||!mark3in||!mark4in) {
                console.log('* Your form has not been completed, please submit it after completion!')
                return res.render('FGroupMarking', {groups:groups,currentUserName:req.session.user.userName ,tips: '* Your form has not been completed, please submit it after completion!'})
            }


            /*
             else if the mark is below 5，module leader must give some comments，then the submission will be successful
             */
            if(mark1in<5&&!reason1in||mark2in<5&&!reason2in||mark3in<5&&!reason3in||mark4in<5&&!reason4in){
                console.log('* Please give some comments if the mark is below 5!')
                return res.render('FGroupMarking', {groups:groups,currentUserName:req.session.user.userName,tips: '* Please give some comments if the mark is below 5!'})
            }

            else
            {
                var marking = new markings(data3)
                marking.save(function (err, res) {
                    //res.send(JSON.stringify(data))
                    console.log(data3)
                })
                res.redirect('/FHomePage')
            }

        } );

});


router.get('/FMyGroups', function(req, res) {


    var userId = req.session.user._id;
    console.log(userId);
/*
    Promise.all([
        groupModel.getGroupsByFId(userId),
        userModel.getNoGroupUsersByRole('Facilitator'),
        userModel.getNoGroupUsersByRole('Student'),
        projectModel.getProjectByLimitedNum()
    ]).then(function (result) {
        console.log(result[0])
        //console.log(result[1])
        // console.log(result[2])
        //console.log(result[3])
    })
*/
    var url=URL.parse(req.url).query;
    console.log(url);//To show how does the URL looks like



    Promise.all([
        groupModel.getGroupsByFId(userId),
        userModel.getNoGroupUsersByRole('Facilitator'),
        userModel.getNoGroupUsersByRole('Student'),
        projectModel.getProjectByLimitedNum()
    ]).then(function (result) {
        // console.log(result[0].length)
        // console.log(result[1].length)
        // console.log(result[2].length)
        // console.log(result[3].length)


        var homeSetting= {
            currentUserName:req.session.user.userName,
            tips:'*Please select a search option',
            groupSelection:' ',
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

        if(!result[1]||!result[2]||!result[3]||!result[0]){
            homeSetting.facilitatorList='';
            homeSetting.memberList='';
        }

        if(!url||url.selectGroup===''){
            return    res.render('FMyGroups',homeSetting)
        }
        else{
            url=URL.parse(req.url,true).query;
            console.log(url)



            if(url.selectGroup==='toAddGroup'){
                homeSetting.groupID='toAddGroup';
                homeSetting.tips='*Please press the Edit button to complete the form for submission. The sixth member is optional, others are required.'
                homeSetting.groupSelection='To add a group';
                return res.render('FMyGroups',homeSetting)
            }else if(url.selectGroup===''){
                homeSetting.groupName='';
                return res.render('FMyGroups',homeSetting)
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
                var parameterSetting={
                    currentUserName:req.session.user.userName,
                    tips:'*The group details has been showed below.',
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
                };


                if(!result[1].member6ID){
                    if(!result[1]||!result[2]||!result[3]||!result[0]){
                        parameterSetting.facilitatorList='';
                        parameterSetting.memberList='';
                    }
                    return  res.render('FMyGroups',parameterSetting)
                }
                else{
                    parameterSetting.member6Name=result[1].member6ID.userName;
                    parameterSetting.member6ID=result[1].member6ID._id;
                    parameterSetting.member6Email=result[1].member6ID.email;
                    if(!result[1]||!result[2]||!result[3]||!result[0]){
                        parameterSetting.facilitatorList='';
                        parameterSetting.memberList='';
                    }
                    return  res.render('FMyGroups',parameterSetting)

                }


                // }



            });
        }
    })

});







module.exports = router;



