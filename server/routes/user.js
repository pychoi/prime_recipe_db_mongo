var express = require('express');
var router = express.Router();
var Users = require('../models/user');

router.get('/', function(req,res){
    res.send(req.user);
});

// Save recipes to meal plan
router.put('/mealPlan', function(req,res){
    Users.findOneAndUpdate({_id: req.user._id}, { $push: {mealSaved: req.body}}, {upsert: true}, function(err, result){
        if(err) return err;
        res.send(result);
    });
});

// Get User's saved recipes
router.get('/mealPlan', function(req,res){
   Users.findById({_id: req.user._id},function(err,result){
       if(err) console.log(err);
       res.send(result);
   });
});

// Remove saved recipe from Meal Plan
router.put('/mealPlan/remove', function(req,res){
    Users.findOneAndUpdate({_id: req.user._id}, { $pull: {mealSaved: req.body}}, {upsert: true}, function(err, result){
        if(err) return err;
        res.send(result);
    });
});


// Save recipes to groceries list
router.put('/groceriesList', function(req,res){
   Users.findOneAndUpdate({_id: req.user._id}, { $push: {groceriesList: req.body}}, {upsert: true}, function(err, result){
       if(err) return err;
       res.send(result);
   });
});

//  Get all items in User's groceries list
router.get('/groceriesList', function(req,res){
    Users.findById({_id: req.user._id},function(err,result){
        if(err) console.log(err);
        res.send(result);
    });
});

// Remove saved recipe from Groceries List
router.put('/groceriesList/remove', function(req,res){
    Users.findOneAndUpdate({_id: req.user._id}, { $pull: {groceriesList: req.body}}, function(err, result){
        if(err) return err;
        res.send(result);
    });
});

// Reset Groceries List
router.delete('/groceriesList', function(req,res){
    Users.findOneAndUpdate({_id: req.user._id}, { $push: {groceriesList: {$each:[], $slice: 0}}}, function(err, result){
        if(err) return err;
        res.send(result);
    });
});


module.exports = router;