var express = require('express');
var router = express.Router();

router.get('/SHomePage', function(req, res) {
    var username=req.session.user.userName;
    res.render('SHomePage',{ currentUserName:username} );
});

router.get('/SGroupMarking', function(req, res) {
    var username=req.session.user.userName;
    res.render('SGroupMarking',{currentUserName:username } );
});

router.get('/SSelectMember', function(req, res) {
    var username=req.session.user.userName;
    res.render('SSelectMember',{currentUserName:username } );
});

router.get('/SSelectProject', function(req, res) {
    var username=req.session.user.userName;
    res.render('SSelectProject',{currentUserName:username } );
});


module.exports = router;
