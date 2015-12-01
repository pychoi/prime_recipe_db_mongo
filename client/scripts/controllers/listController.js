myApp.controller('ListController', ['$scope','$http',function($scope,$http){
    //console.log("ListController is working!");

    $scope.noSavedRecipesMessage = false;
    $scope.savedList = [];

    // Hide Add to Meal Plan Button
    //$scope.checkSaved = true;

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
                }
            }
        });
    };

    $scope.getList();

    $scope.saveStatus = function(){
        // put call to save SAVELIST to DB
        //console.log($scope.savedList);

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