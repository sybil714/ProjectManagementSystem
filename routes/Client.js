const express = require('express');
const router = express.Router();
const mongo = require('../lib/mongo');
const projects = mongo.projects;
const feedbacks = mongo.feedbacks;

/* GET homepage . */
//
router.get('/CHomePage',function (req,res) {
    res.render('CHomePage',{})
});

router.get('/CFeedback',function (req,res) {
    res.render('CFeedback',{})
});

/* GET project . */
router.get('/CProjectRelease',function (req,res) {
    res.render('CProjectRelease',{})
});

router.post('/CProjectRelease' , function(req, res,next) {
    var data = {
        projectName: req.body.projectName,
        projectContent: req.body.projectContent,
    }

    var project = new projects(data)
    project.save(function (err,res) {
        //res.send(JSON.stringify(data))
        console.log(data)
    })
});

/* GET feedback . */
router.get('/CFeedback',function (req,res) {
    res.render('CFeedback',{})

    router.post('/CFeedback' , function(req, res,next) {

        var data2 = {
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

        var feedback = new feedbacks(data2)
        feedback.save(function (err,res) {
            //res.send(JSON.stringify(data))
            console.log(data2)

        })
        res.redirect('/CHomePage')
    });

});

module.exports = router;