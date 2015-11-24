var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var recipeSchema = require('../modules/schema');

var Recipe = mongoose.model('Recipe', recipeSchema);

router.get('/keyword', function(req, res){

    //console.log(req.query.keyword);

    Recipe.find({$text: {$search: req.query.keyword}}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    })
});

router.get('/categories', function(req, res){

    //console.log(req.query.categories);

    Recipe.find({categories: req.query.categories}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    })
});

module.exports = router;