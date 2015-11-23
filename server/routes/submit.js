var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/graces_kitchen';

router.post("/recipeInfo", function(req, res, next){

    console.log(req.body);

    var recipeInfo = {
        "name": req.body.name,
        "source":req.body.source
    };

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO recipes (recipe_name, recipe_source) VALUES ($1, $2)",
            [recipeInfo.name, recipeInfo.source],
            function (err, result) {
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });
});

router.delete('/recipeInfo', function(req,res,next){
    pg.connect(connectionString, function(err, client){
        client.query("DELETE FROM recipes WHERE id = (SELECT id FROM recipes ORDER BY id DESC LIMIT 1)",
            function (err, result) {
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });
});

router.post("/ingredient", function(req, res, next){

    console.log(req.body);

    var ingredient = {
        "name": req.body.name,
        "amount":req.body.amount
    };

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO ingredients (ingredient_name, ingredient_amount, recipe_id) VALUES ($1, $2, (SELECT id FROM recipes ORDER BY id DESC LIMIT 1))",
            [ingredient.name, ingredient.amount],
            function (err, result) {
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });
});


module.exports = router;