var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var recipeSchema = require('../modules/schema');

//mongoose.connect('mongodb://localhost/recipe_db');
var Recipe = mongoose.model('Recipe', recipeSchema);

router.post('/', function(req,res){
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

module.exports = router;