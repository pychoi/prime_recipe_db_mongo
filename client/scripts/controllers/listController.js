myApp.controller('ListController', ['$scope','$http',function($scope,$http){

    $scope.noSavedRecipesMessage = false;
    $scope.saveSuccessMessage = false;
    $scope.savedList = [];

    //GET all items in the list
    $scope.getList = function(){
        $http.get('/user/groceriesList').then(function(response){
            $scope.savedList = response.data.groceriesList;

            if($scope.savedList.length < 1){
                $scope.noSavedRecipesMessage = true;
            }
        });
    };

    // Remove specific recipe from List
    $scope.removeFromList = function(recipe){
        $http.put('/user/groceriesList/remove', recipe).then(function(){
            console.log("removed from list");
            $scope.getList();
        });
    };

    // Reset Entire List
    $scope.resetList = function(){
        $http.delete('/user/groceriesList').then(function(){
            $scope.getList();
        });
    };

    // Modal to show Recipe
    $scope.toggleModal = function(recipe) {
        $scope.modalShown = !$scope.modalShown;
        $scope.currentIndex = $scope.savedList.indexOf(recipe);

        // Check if recipe is already in Meal Plan.  If it is, disable "Add to Meal Plan" button
        $http.get('/user/mealPlan').then(function(response){
            $scope.savedRecipes = response.data.mealSaved;

            for (var i = 0; i < $scope.savedRecipes.length; i++) {
                if ($scope.savedRecipes[i]._id == recipe._id) {
                    $scope.checkMealPlan = true;
                    $scope.saveSuccessMessage = true;
                }
            }
        });
    };

    // Add to Meal Plan Button
    $scope.addToMealPlan = function(dish){
        // Save dish to user profile
        $http.put('/user/mealPlan', dish).then(function(){
            //console.log(response.data.mealSaved);
            $scope.checkMealPlan = true;
            $scope.saveSuccessMessage = true;
        });
    };

    // Save list status
    $scope.saveStatus = function(){
        // Reset List
        $http.delete('/user/groceriesList').then(function(){

        // Add Updated Recipes to Groceries List
            for (var i = 0; i < $scope.savedList.length; i++) {
                $http.put('/user/groceriesList', $scope.savedList[i]).then(function () {
                    $scope.getList();
                });
            }
        })
    };


}]);