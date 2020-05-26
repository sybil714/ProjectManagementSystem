var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('Login', {tips:''});
// });

//logout
router.get("/logout",function(req,res){
  var user = req.session.user;
  console.log(user);
  user = req.session.user = null;
  console.log(user);
  res.redirect("/Login");

});



module.exports = router;
