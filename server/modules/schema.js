var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({"name": String,
        "source": String,
        "ingredients": Array,
        "instructions": Array,
        "categories": Array},
        {collection: "recipe"});

module.exports = recipeSchema;

