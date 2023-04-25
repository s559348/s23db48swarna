var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


 



require('dotenv').config();
const connectionString =process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;

// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');


//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var swarnaRouter = require('./routes/shirt');
var selectRouter = require('./routes/selector');
var boardRouter = require('./routes/board');
var shirt = require("./models/shirt");
var resourceRouter = require('./routes/resource');


var app = express();

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username }, function (err, user) {
     if (err) { return done(err); }
     if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
     }
     if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
     }
     return done(null, user);
    });
   }))
 
   app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
   }));
   app.use(passport.initialize());
   app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shirt', swarnaRouter);
app.use('/selector', selectRouter);
app.use('/board', boardRouter);
app.use('/resource', resourceRouter);





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

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// We can seed the collection if needed onserver start
async function recreateDB(){
 // Delete everything
 await shirt.deleteMany();
 let instance1 = new
shirt({shirt_type:"Formal", shirt_size:'Small',
shirt_value:50});
let instance2 = new
shirt({shirt_type:"T-shirt", shirt_size:'Medium',
shirt_value:70});
let instance3 = new
shirt({shirt_type:"Casual", shirt_size:'Large',
shirt_value:100});
 instance1.save().then( function(err,doc) {
 if(err) return console.error(err);
 console.log("First object saved")
 });
 instance2.save().then( function(err,doc) {
  if(err) return console.error(err);
  console.log("second object saved")
  });
  instance3.save().then( function(err,doc) {
    if(err) return console.error(err);
    console.log("third object saved")
    });
}
let reseed = false;
if (reseed) { recreateDB();}
module.exports = app;
