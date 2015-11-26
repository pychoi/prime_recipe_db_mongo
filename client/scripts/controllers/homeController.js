myApp.controller('HomeController', ['$scope','$http', function($scope, $http){
    //console.log("HomeController is working!");

    $scope.randomResult = {};

    $scope.randomRecipe = function(){
        $http.get('/random/').then(function(response){
            $scope.randomResult = response.data;
        });
    };

    $scope.randomRecipe();

    // Modal
    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };

    // Add to Meal Plan Button
    $scope.saveSuccessMessage = false;
    $scope.addToMealPlan = function(dish){

        // Save dish to user profile
        $http.put('/user/mealPlan', dish).then(function(){
            $scope.saveSuccessMessage = true;
        });
    }

}]);