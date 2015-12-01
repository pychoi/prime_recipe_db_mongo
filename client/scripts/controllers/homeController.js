myApp.controller('HomeController', ['$scope','$http','DataService', function($scope, $http, DataService){
    //console.log("HomeController is working!");

    $scope.randomResult = {};
    $scope.checkMealPlan = false;
    $scope.modalShown = false;
    $scope.showRandom = false;

    $scope.dataService = DataService;

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

    // GET random recipe from DB when clicked
    $scope.randomRecipeClick = function(){
        $scope.showRandom = true;
        $scope.randomRecipe();
    };

    //$scope.getMealPlan = function(){
    //    if($scope.dataService.mealPlanData() === undefined) {
    //        console.log("getting user list from user service");
    //        $scope.dataService.retrieveData()
    //            .then(function() {
    //                $scope.users = $scope.dataService.mealPlanData();
    //            });
    //    } else {
    //        $scope.users = $scope.dataService.mealPlanData();
    //    }
    //};

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