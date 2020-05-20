var express = require('express');
var router = express.Router();

router.get('/CHomePage', function(req, res) {
    res.render('CHomePage',{ } );
});

router.get('/CFeedback', function(req, res) {
    res.render('Cfeedback',{ } );
});

router.get('/CProjectRelease', function(req, res) {
    res.render('CProjectRelease',{ } );
});



module.exports = router;