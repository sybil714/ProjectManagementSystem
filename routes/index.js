var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/regist',function (req,res) {
  res.render('Page2Registration',{})
});

router.get('/login',function (req,res) {
  res.render('Page1Login',{})
});


module.exports = router;
