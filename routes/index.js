var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/logout",function(req,res){
  req.session.userName = null;
  res.redirect("/Login");
});



module.exports = router;
