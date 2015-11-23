myApp.controller('EnterController', ['$scope', '$http', function($scope, $http){
    console.log("EnterController is working!");

    $scope.recipeInfo = {};
    $scope.ingredient = {};
    $scope.ingredients = [];
    $scope.categories = [];
    $scope.disable = false;

    // $scope.steps array contains all step numbers and corresponding instructions as objects
    $scope.steps = [{step: 'Step 1'}];

    $scope.main = ['Beef', 'Pork', 'Chicken/Poultry', 'Lamb/Goat', 'Seafood', 'Pasta/Noodle', 'Tofu', 'Vegetables', 'Egg', 'Rice/Congee'];
    $scope.cuisine =['Chinese', 'American', 'Italian', 'Mexican', 'Japanese', 'Korean', 'Indian', 'Southeast Asian (Thai, Vietnamese, Singaporean, Malaysian)'];
    $scope.type = ['Bread', 'Dessert', 'Dim Sum', 'Soup', 'Chinese Festival', 'BBQ', 'Herbal Medicine', 'Salad', 'Sauces'];


    $scope.addName = function(recipeInfo){
        //$scope.accordion = 2;
        $http.post('/submit/recipeInfo', $scope.recipeInfo).then(function(){
            console.log("Recipe Info saved");
            $scope.disable = true;
        });
    };

    $scope.deleteName = function(){
        $scope.disable = false;
        $scope.recipeInfo = {};
        $http.delete('/submit/recipeInfo').then(function(){
            console.log('deleted recipe info!');
        });
    };


    $scope.addNewIngredient = function(){
        $scope.ingredients.push($scope.ingredient);

        $http.post('/submit/ingredient', $scope.ingredient).then(function(response){
            console.log(response);
            console.log("Ingredient saved");
        });

        $scope.ingredient = {};
    };

    $scope.deleteIngredient = function(foo){
        for(var i = 0; i < $scope.ingredients.length; i++){
            if(foo.name == $scope.ingredients[i].name && foo.amount == $scope.ingredients[i].amount){
                $scope.ingredients.splice(i,1);
            }
        }

        $http.delete('/submit/ingredient').then(function(){
            console.log('deleted ingredient!');
        });

    };

    $scope.addNewStep = function(){
        var newItemNum = $scope.steps.length + 1;
        $scope.steps.push({step: 'Step '+ newItemNum});
        //console.log($scope.steps);
    };

    //remove step function...

    $scope.toggleChecked = function(foo){
        if ($scope.categories.indexOf(foo) === -1){
            $scope.categories.push(foo);
        } else {
            $scope.categories.splice($scope.categories.indexOf(foo), 1);
        }
    };

    $scope.submitRecipe = function(){
        $http.post('/submit/categories', $scope.categories).then(function(){
            console.log("success");
        });

        //check if there's at least on ingredient and amount, and at least one step

    };

}]);