var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });

});

passport.use('local', new localStrategy({    //setting options for this strategy
    passReqToCallback: true,      //password required to fire call back  // default = false
    usernameField: 'username'
}, function(req, username, password, done){

    User.findOne({username: username}, function(err, user){
        if(err) throw err;   //if cannot find user, an error will be thrown
        if(!user) return done(null, false, {message: "Incorrect username and password"}); //if user is undefined
        user.comparePassword(password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null, user);  //if it is a match, pass user along to the session
            } else {
                done(null, false, {message: "Incorrect username and password"});
            }
        });
    });
}));

module.exports = passport;
