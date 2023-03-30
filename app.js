var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//setup mongoose
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

var app = express();
const {getUserById} = require('./controllers/user');

//setup express session
const session = require('express-session');
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
//setup passport
const passport = require('passport');
//setup jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new JwtStrategy({
    //options
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  },async (jwtPayload,done)=>{
    try{
      const user = await getUserById(jwtPayload.id);
      if (user){
        return done(null,user);
      }else{
        return done(null,false);
      }
    }catch(e){
      console.log(`there was an error ${e} when getting the user`);
    }
  })
);
passport.serializeUser((user,done)=>{
  return done(null,user._id);
})
passport.deserializeUser(async (docID,done)=>{
  const user = await getUserById(docID);
  return done(null,user);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


mongoose.connect(process.env.DATABASE_URL)
  .then(()=>{
    console.log('successfully connected to mongodb!');
  })
  .catch((e)=>{
    console.log(`error ${e} when connecting to mongodb`);
  });
  
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
