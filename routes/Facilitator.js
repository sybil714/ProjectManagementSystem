var express = require('express');
var router = express.Router();

router.get('/FHomePage', function(req, res) {
    res.render('FHomePage',{ } );
});


module.exports = router;
