myApp.controller('EnterController', ['$scope', '$http', function($scope, $http){
    console.log("EnterController is working!");

    $scope.recipe = {};
    $scope.ingredient = {};
    $scope.ingredients = [];
    $scope.categories = [];

    // $scope.steps array contains all step numbers and corresponding instructions as objects
    $scope.steps = [{step: 'Step 1'}];

    $scope.addNewStep = function(){
        var newItemNum = $scope.steps.length + 1;
        $scope.steps.push({step: 'Step '+ newItemNum});
        //console.log($scope.steps);
    };

    $scope.addNewIngredient = function(){
        $scope.ingredients.push($scope.ingredient);
        $scope.ingredient = {};
    };

    $scope.deleteIngredient = function(foo){
        for(var i = 0; i < $scope.ingredients.length; i++){
            if(foo.name == $scope.ingredients[i].name && foo.amount == $scope.ingredients[i].amount){
                $scope.ingredients.splice(i,1);
            }
        }
        //console.log($scope.ingredients);
    };

    $scope.submitRecipe = function(){
        console.log($scope.recipe);
        //console.log($scope.ingredients);
        //console.log($scope.steps);
        $http.post('/submit', $scope.recipe).then(function(){
            $scope.getRecipeId();
        });

    };

    $scope.getRecipeId = function(){
        $http.get('/submit').then(function(){

        });
    }


}]);