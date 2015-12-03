var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./strategies/user');
var session = require('express-session');

// Routes //
var index = require('./routes/index');
var submit = require('./routes/submit');
var search = require('./routes/search');
var random = require('./routes/random');
var register = require('./routes/register');
var user = require('./routes/user');
var logout = require('./routes/logout');

// App Set //
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

// Passport Session Configuration //
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/logout', logout);
app.use('/submit', submit);
app.use('/search', search);
app.use('/random', random);
app.use('/', index);

// Mongo Connection //
var mongoURI = MONGOLAB_URI;
    //"mongodb://localhost:27017/recipe_db";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR");
});

mongoDB.once('open', function(){
    console.log("Connected to Mongo, meow!");
});

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;