var express = require('express');
var router = express.Router();

router.get('/SHomePage', function(req, res) {
    res.render('SHomePage',{ } );
});

module.exports = router;
