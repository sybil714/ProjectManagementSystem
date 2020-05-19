var express = require('express');
var router = express.Router();
const userModel = require('../models/user');

/* GET home page. */

router.get('/Login',function (req,res) {
    res.render('Login',{tips: ''})
});

router.get('/Registration',function (req,res) {

});


router.post('/Login',function (req,res) {
    var data= {
        emailAddress : req.body.emailAddress,
        password : req.body.password,
    }

    var emailAddress=data.emailAddress;
    var passwordInputed=data.password;
        userModel.getUsersByEmail(emailAddress)
        .then(function (result) {
            if(!result){
                return res.render('Login',{tips: 'This email is not found,try again!'})
            }
            else if(passwordInputed===result.password){
                if(result.role==="Student"){
                    return res.redirect('/SHomePage')
                }
                else if(result.role==="Facilitator"){
                    return res.redirect('/FHomePage')
                }
                else if(result.role==="Module Leader"){
                    return res.redirect('/MLHomePage')
                }
                else if(result.role==="Client"){
                    return res.redirect('/CHomePage')
                }
            }
            else{
                return res.render('Login',{tips: 'User name and password do not match,try again!'})
            }
        })


});


module.exports = router;
