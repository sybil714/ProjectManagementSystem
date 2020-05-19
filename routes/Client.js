var express = require('express');
var router = express.Router();

router.get('/CHomePage', function(req, res) {
    res.render('CHomePage',{ } );
});


module.exports = router;