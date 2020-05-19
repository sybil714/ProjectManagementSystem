var express = require('express');
var router = express.Router();

router.get('/MLHomePage', function(req, res) {
    res.render('MLHomePage',{ } );
});


module.exports = router;
