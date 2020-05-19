const express = require('express');
const router = express.Router();
const mongo = require('../lib/mongo');
const projects = mongo.projects;

/* GET users listing. */
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
        console.log("projectName")
    })
});

module.exports = router;