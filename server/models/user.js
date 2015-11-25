var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTORY = 10;  //how much to screw it up // convention is 10 // higher = more secure

var UserSchema = new Schema({
    username: {type: String, required: true, index:{unique: true}},
    password: {type: String, required: true},
    mealSaved: {type: Array},
    groceriesList: {type: Array}},
    {collection: "users"});

UserSchema.pre('save', function(next){  //move to next thing in the middleware land
    var user = this;  //this is the user that is trying to log in

    if(!user.isModified('password')) return next;   //if user is NOT trying to modify the password, move on

    bcrypt.genSalt(SALT_WORK_FACTORY, function(err, salt){
        if(err) return next(err);  //get out of this middleware stack and pass error to next thing

        bcrypt.hash(user.password, salt, function(err, hash){ //hash = new representation of the password
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });

});

UserSchema.methods.comparePassword = function(candidatePassword, cb){  //cb = call back
// compare password entered (candidate password) and password when user logs in
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){   //this is user
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);

