var express = require('express');
var router = express.Router();

router.get('/SHomePage', function(req, res) {
    res.render('SHomePage',{ } );
});

router.get('/SGroupMarking', function(req, res) {
    res.render('SGroupMarking',{ } );
});

router.get('/SSelectMember', function(req, res) {
    res.render('SSelectMember',{ } );
});

router.get('/SSelectProject', function(req, res) {
    res.render('SSelectProject',{ } );
});
module.exports = router;
