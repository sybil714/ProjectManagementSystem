var express = require('express');
var router = express.Router();
var isEmailCorrect=false;
var isPasswordCorrect=false;


const mongo = require('../lib/mongo');
const users = mongo.users;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/regist' , function(req, res,next) {
  var data= {
    userName : req.body.userName,
    emailAddress : req.body.emailAddress,
    confirmEmail : req.body.confirmEmail,
    phoneNum : req.body.phoneNum,
    password : req.body.password,
    confirmPassword : req.body.confirmPassword,
  }


  if(data.emailAddress==data.confirmEmail){
    isEmailCorrect=true;
  }
  else{
    console.log("The E-mail address is not confirmed")
    res.render('/',{})
  }

  if(data.password==data.confirmPassword){
    isPasswordCorrect=true
  }  else {
    console.log("The Password is not confirmed")
   res.render('Page1Login',{})
  }
  if(isPasswordCorrect&isEmailCorrect){
    var data2= {
      userName : data.userName,
      email: data.emailAddress,
      phoneNumber : data.phoneNum,
      password : data.password,
    }

    var user=new users(data2)``

    user.save(function (err,res) {
      if(err){
        console.log("Error:" + err);
      }else
      {
        console.log("Res:" + res);
      }
      //res.render('Page1Login',{})
    })
  }


});

module.exports = router;
