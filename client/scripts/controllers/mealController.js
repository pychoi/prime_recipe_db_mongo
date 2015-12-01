myApp.controller('MealController', ['$scope','$http', function($scope,$http){
    //console.log("MealController is working!");

    //$scope.randomResult = {};
    $scope.savedRecipes = [];
    $scope.savedList = [];
    $scope.noSavedRecipesMessage = false;
    $scope.modalShown = false;
    $scope.currentIndex;
    //$scope.showRandom = false;
    $scope.disableListButton = {};

    // Random Recipe Generation
    //$scope.randomRecipe = function(){
    //    $http.get('/random/').then(function(response){
    //        $scope.randomResult = response.data;
    //        $scope.showRandom = true;
    //    });
    //};

    // Display User's Saved Recipes
    $scope.getSavedRecipes = function(){
        $http.get('/user/mealPlan').then(function(response){
            $scope.savedRecipes = response.data.mealSaved;

            if($scope.savedRecipes.length < 1){
                $scope.noSavedRecipesMessage = true;
            }

        });

        // Check if recipe is already in Groceries.  If it is, disable "Add to Groceries List" button
        $http.get('/user/groceriesList').then(function(response){
            $scope.savedList = response.data.groceriesList;

            for (var i = 0; i < $scope.savedRecipes.length; i++) {
                for (var j = 0; j < $scope.savedList.length; j++) {
                    if ($scope.savedRecipes[i]._id == $scope.savedList[j]._id) {
                        $scope.disableListButton[$scope.savedList[j].name] = true;
                    }
                }
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

        // Check if recipe is already in Meal Plan.  If it is, disable "Add to Meal Plan" button
        $http.get('/user/mealPlan').then(function(response){
            $scope.savedRecipes = response.data.mealSaved;

            for (var i = 0; i < $scope.savedRecipes.length; i++) {
                if ($scope.savedRecipes[i]._id == recipe._id) {
                    $scope.checkMealPlan = true;
                }
            }
        });
    };

    // Add Recipe to Groceries List
    $scope.addToList = function(dish){
        $http.put('/user/groceriesList', dish).then(function(){
            $scope.disableListButton[dish.name] = true;
        });
    };

    $scope.getSavedRecipes();

}]);