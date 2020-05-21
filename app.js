var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session=require('express-session');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret:'ProjectManagementSystem',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:1000*60*60*24}
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);


/*******This is a login blocking function.
 * If the user does not log in,
 * the user is only allowed to access the login or registration page
 * *********/

app.get('*',function (req,res,next) {
  var user = req.session.user;
  var path=req.path
  //console.log(user)
  if(path !='/Login'&& path !='/Registration'){
    if(!user){
    res.redirect('/Login')
    }
  }
  next()
})



app.use('/', require('./routes/test'));
app.use('/', require('./routes/Client'));
app.use('/', require('./routes/Student'));
app.use('/', require('./routes/Client'));
app.use('/', require('./routes/Facilitator'));
app.use('/', require('./routes/ModuleLeader'));
app.use('/', require('./routes/admin'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
