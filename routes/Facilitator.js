const express = require('express');
const router = express.Router();
const mongo = require('../lib/mongo');
const assessments = mongo.assessments;

/* GET homepage . */
router.get('/FHomePage', function(req, res) {
    res.render('FHomePage',{ } );
});

router.get('/FGroupMarking',function (req,res) {
    res.render('FGroupMarking',{ } )
});



/* GET feedback . */
router.get('/FGroupMarking',function (req,res) {
    res.render('FGroupMarking',{})

    router.post('/FGroupMarking' , function(req, res,next) {

        var data2 = {
            meeting:req.body.meeting,
            mark1: req.body.mark1,
            reason1: req.body.reason1,
            mark2: req.body.mark2,
            reason2: req.body.reason2,
            Comments: req.body.Comments,
        }

        var assessment = new assessments(data2)
        assessment.save(function (err,res) {
            //res.send(JSON.stringify(data))
            console.log(data2)

        })
        res.redirect('/FHomePage')
    });

});

module.exports = router;



