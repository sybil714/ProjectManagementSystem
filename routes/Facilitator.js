const express = require('express');
const router = express.Router();
const mongo = require('../lib/mongo');
const assessments = mongo.assessments;

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
    res.render('FGroupMarking',{
        currentUserName:username,
        tips:''
    })
});

router.post('/FGroupMarking' , function(req, res,next) {

        var data2 = {
            facilitatorID:req.session.user._id,
            meeting:req.body.meeting,
            mark1: req.body.mark1,
            reason1: req.body.reason1,
            mark2: req.body.mark2,
            reason2: req.body.reason2,
            Comments: req.body.Comments,
        }

    var mark1in=data2.mark1;
    var mark2in=data2.mark2;
    var reason1in=data2.reason1;
    var reason2in=data2.reason2;
    var Commentsin=data2.Comments;
    //console.log(!mark1in)
    //console.log(mark1in)
    //console.log(mark1in>3)

    /*
      If the facilitator misses a marking, the submission will be unsuccessful and a prompt will pop up
     */
    if(!mark1in||!mark2in) {
        console.log('Your form has not been completed, please submit it after completion!')
        return res.render('FGroupMarking', {tips: '* Your form has not been completed, please submit it after completion!'})
    }

    /*
     else if the mark is below 5，facilitator should give some comments，then the submission will be successful
     */
    if(!reason1in||!reason2in||!Commentsin){
        console.log('* Please give some comments')
        return res.render('FGroupMarking', {tips: '* Please give some comments'})
    }

    else {
        var assessment = new assessments(data2)
        assessment.save(function (err, res) {
            console.log(data2)
        })

        res.redirect('/FHomePage')
    }
});



module.exports = router;



