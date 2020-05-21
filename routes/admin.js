var express = require('express');
var router = express.Router();
const userModel = require('../models/user');
const mongo = require('../lib/mongo');
const users = mongo.users;

/* GET home page. */

router.get('/Login',function (req,res) {
    res.render('Login',{tips: ''})
});

router.get('/Registration',function (req,res) {
    res.render('Registration',{tips: ''})
});


router.post('/Login',function (req,res) {
    var data= {
        emailAddress : req.body.emailAddress,
        password : req.body.password,
    };

    var emailAddress=data.emailAddress;
    var passwordInputed=data.password;
        userModel.getUsersByEmail(emailAddress)
        .then(function (result) {
            if(!result){
                return res.render('Login',{tips: 'This email is not found,try again!'})
            }
            else if(passwordInputed===result.password){
                if(result.role==="Student"){
                    req.session.user=result;
                    console.log(req.session.user._id)
                    return res.redirect('/SHomePage')
                }
                else if(result.role==="Facilitator"){
                    req.session.user=result;
                    return res.redirect('/FHomePage')
                }
                else if(result.role==="Module Leader"){
                    req.session.user=result;
                    return res.redirect('/MLHomePage')
                }
                else if(result.role==="Client"){
                    req.session.user=result;
                    return res.redirect('/CHomePage')
                }
            }
            else{
                return res.render('Login',{tips: 'User name and password do not match,try again!'})
            }
        })


});

// Registration
router.post('/Registration',function (req,res) {
    var newUser= {
        userName: req.body.userName,
        password : req.body.password,
        emailAddress : req.body.emailAddress,
        confirmEmail: req.body.confirmEmail,
        confirmPassword: req.body.confirmPassword,
        role: req.body.role,
    };
    var emailAddress1=newUser.emailAddress;
    var emailAddress2=newUser.confirmEmail;
    var password1=newUser.password;
    var password2=newUser.confirmPassword;
    var role=newUser.role;
    var userName=newUser.userName;

    if(role !== 'Student' && role !== 'Facilitator' && role !== 'Client' && role !== 'Module Leader'){
        return res.render('Registration', {tips: 'Please choose your identity!'})
    }
    if(!userName){
        return res.render('Registration', {tips: 'Username can not be blank!'})
    }
    if(!emailAddress1){
        return res.render('Registration', {tips: 'Email address can not be blank!'})
    }
    if(!password1){
        return res.render('Registration', {tips: 'Password can not be blank!'})
    }
    if(password1 === password2 ){
        var password = password1;
    }else{
        return res.render('Registration', {tips: 'Different passwords input!'})
    }
    if(emailAddress1 === emailAddress2){
        var emailAddress = emailAddress1;
    }else{
        return res.render('Registration', {tips: 'Different email adress input!'})
    }
        var newUser2= {
            userName: userName,
            password: password,
            email: emailAddress,
            role: role,
        };
    /*userModel.getUsersByEmail(emailAddress)
        .then(function (result) {
            if(result){
                return res.render('Registration',{tips: 'This email address has been registered!'})
            }*/
        var user = new users(newUser2)
        user.save(function (err, res) {
            console.log(newUser2);
        })
    return res.render('Login',{tips: 'Successfully registered!'})
});

//


module.exports = router;
