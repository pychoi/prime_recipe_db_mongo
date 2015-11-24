var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req,res,next){  //send to the register page
    res.sendFile(path.resolve(__dirname, '../public/assets/views/register.html'));
});

router.post('/', function(req, res, next){
    Users.create(req.body, function(err, post){ //.create is mongoose
        if(err){
            next(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;