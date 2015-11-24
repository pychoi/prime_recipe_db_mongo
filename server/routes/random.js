var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recipeSchema = require('../modules/schema');

var random = require('mongoose-simple-random');

recipeSchema.plugin(random);

//Have to use "Test" for the plugin to work
Test = mongoose.model('Test', recipeSchema);

router.get('/', function(req,res,next){
    Test.findOneRandom(function(err, element) {
        if (err) console.log(err);
        //else console.log(element);
        res.send(element);
    });

});



module.exports = router;