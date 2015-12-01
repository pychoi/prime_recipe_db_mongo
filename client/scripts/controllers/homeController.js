myApp.controller('HomeController', ['$scope','$http', function($scope, $http){
    //console.log("HomeController is working!");

    $scope.randomResult = {};
    $scope.checkMealPlan = false;
    $scope.modalShown = false;
    $scope.showRandom = false;

    $scope.randomRecipe = function(){
        $scope.checkMealPlan = false;
        $http.get('/random/').then(function(response){
            $scope.randomResult = response.data;

            // Check if recipe is already in Meal Plan.  If it is, disable "Add to Meal Plan" button
            $http.get('/user/mealPlan').then(function(response){
                $scope.savedRecipes = response.data.mealSaved;

                for (var i = 0; i < $scope.savedRecipes.length; i++) {
                    if ($scope.savedRecipes[i]._id == $scope.randomResult._id) {
                        $scope.checkMealPlan = true;
                    }
                }
            });
        });
    };

    $scope.randomRecipeClick = function(){
        $scope.showRandom = true;
        $scope.randomRecipe();
    };

    $scope.randomRecipe();

    // Modal
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };

    // Add to Meal Plan Button
    $scope.addToMealPlan = function(dish){
        // Save dish to user profile
        $http.put('/user/mealPlan', dish).then(function(){
            $scope.checkMealPlan = true;
        });
    }

}]);