var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/graces_kitchen';

router.post("/", function(req, res, next){
    var recipeInfo = {
        "recipe_name": req.body.name,
        "recipe_source":req.body.source
    };

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO recipes (recipe_name, recipe_source) VALUES ($1, $2)",
            [recipeInfo.recipe_name, recipeInfo.recipe_source],
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