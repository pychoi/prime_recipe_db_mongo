var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/recipe_db');
mongoose.model("Recipe", new Schema({"name": String, "source": String, "ingredients": Array, "instructions": Array, "categories": Array}, {collection: "recipe"}));
var Recipe = mongoose.model('Recipe');

router.post('/data', function(req,res){
   var addedRecipe = new Recipe({
       "name": req.body.name,
       "source": req.body.source,
       "ingredients": req.body.ingredients,
       "instructions": req.body.instructions,
       "categories": req.body.categories
   });

    addedRecipe.save(function(err,data){
        if(err) console.log(err);
        res.send(data);
    });
});

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