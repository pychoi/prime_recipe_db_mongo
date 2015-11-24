myApp.controller('EnterController', ["$scope", "$http", "DataService", function($scope, $http, DataService){
    //console.log("EnterController is working!");

    $scope.dataService = DataService;

    $scope.recipe = {};
    $scope.recipe.ingredients = [];
    $scope.recipe.instructions = [{step: 1}];
    $scope.recipe.categories = [];
    $scope.ingredient = {};
    $scope.disable = false;
    $scope.checkIngredient = true;
    $scope.newRecipe = {};
    $scope.searchMode = true;

    // $scope.steps array contains all step numbers and corresponding instructions as objects
    //$scope.steps = [{step: 1}];
    //$scope.steps = [];

    $scope.main = $scope.dataService.mainArray();
    $scope.cuisine = $scope.dataService.cuisineArray();
    $scope.type = $scope.dataService.dishTypeArray();


    $scope.addIngredient = function(){
        $scope.recipe.ingredients.push($scope.ingredient);
        $scope.checkIngredient = false;
        $scope.ingredient = {};
        $scope.enterIngredients.$setUntouched();
    };

    $scope.deleteIngredient = function(foo){
        for(var i = 0; i < $scope.recipe.ingredients.length; i++){
            if(foo.name == $scope.recipe.ingredients[i].name && foo.amount == $scope.recipe.ingredients[i].amount){
                $scope.recipe.ingredients.splice(i,1);
            }
        }
            if($scope.recipe.ingredients.length < 1){
                $scope.checkIngredient = true;
            }
    };

    $scope.addNewStep = function(){
        var newItemNum = $scope.recipe.instructions.length + 1;
        $scope.recipe.instructions.push({step: newItemNum});
    };

    $scope.removeStep = function(foo){
        for(var i = 0; i < $scope.recipe.instructions.length; i++){
            if(foo.step == $scope.recipe.instructions[i].step){
                $scope.recipe.instructions.splice(i,1);
            }
        }

        for(var i = 0; i < $scope.recipe.instructions.length; i++){
            $scope.recipe.instructions[i].step = i+1;
        }
    };

    $scope.checkInstruction = function(steps){

        for(var i = 0; i < steps.length; i++) {

            if (steps[i].instruction) {
                $scope.noStepErrorMessage = false;
                $scope.accordion = 4;
            }
        }
    };

    $scope.toggleChecked = function(foo){
        if ($scope.recipe.categories.indexOf(foo) === -1){
            $scope.recipe.categories.push(foo);
        } else {
            $scope.recipe.categories.splice($scope.recipe.categories.indexOf(foo), 1);
        }
    };

    $scope.submitRecipe = function(){

        $http.post('/submit/', $scope.recipe).then(function(response){
            $scope.newRecipe = response.data;
            $scope.successMessage = "Recipe is entered!";
            $scope.searchMode = false;

        });
    };

}]);