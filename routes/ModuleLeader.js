var express = require('express');
var router = express.Router();

router.get('/MLHomePage', function(req, res) {
    res.render('MLHomePage',{ } );
});

router.get('/MLGroup', function(req, res) {
    res.render('MLGroupManagement',{ } );
});

router.get('/MLProject', function(req, res) {
    res.render('MLManagement',{ } );
});




module.exports = router;
