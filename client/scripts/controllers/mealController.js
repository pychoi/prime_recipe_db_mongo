myApp.controller('MealController', ['$scope','$http', function($scope,$http){
    console.log("MealController is working!");

    $scope.randomResult = {};
    $scope.savedRecipes = [];
    $scope.noSavedRecipesMessage = false;
    $scope.modalShown = false;
    $scope.currentIndex;
    $scope.checkRandom = false;

    // Hide Add to Meal Plan Button in Recipe
    $scope.checkSaved = true;

    // Random Recipe Generation
    $scope.randomRecipe = function(){
        $http.get('/random/').then(function(response){
            $scope.randomResult = response.data;
            $scope.checkRandom = true;
        });
    };

    // Display User's Saved Recipes
    $scope.getSavedRecipes = function(){
        $http.get('/user/mealPlan').then(function(response){
            $scope.savedRecipes = response.data.mealSaved;

            if($scope.savedRecipes.length < 1){
                $scope.noSavedRecipesMessage = true;
            }

        });
    };

    // Remove Recipe from Meal Plan
    $scope.removeFromMealPlan = function(recipe){
      $http.put('/user/mealPlan/remove', recipe).then(function(){
          $scope.getSavedRecipes();
      });
    };

    // Modal to show Recipe
    $scope.toggleModal = function(recipe) {
        $scope.modalShown = !$scope.modalShown;
        $scope.currentIndex = $scope.savedRecipes.indexOf(recipe);
    };

    // Add Recipe to Groceries List
    $scope.addToList = function(dish){
        $http.put('/user/groceriesList', dish).then(function(){
            $scope.disableButton = true;
        });
    };

    $scope.getSavedRecipes()

}]);