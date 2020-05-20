var express = require('express');
var router = express.Router();

router.get('/FHomePage', function(req, res) {
    res.render('FHomePage',{ } );
});

router.get('/FGroupMarking',function (req,res) {
    res.render('FGroupMarking',{ } )
});



module.exports = router;
