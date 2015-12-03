myApp.controller('ResultController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams){
    //console.log("ResultController is working!");

    $scope.resultArray = [];
    $scope.query = $routeParams.query;
    $scope.url = $location.absUrl();
    $scope.modalShown = false;
    $scope.currentIndex;
    $scope.saveSuccessMessage = false;
    $scope.checkMealPlan = false;
    $scope.savedRecipes = [];


    // Check which GET call route to use
    $scope.checkType = typeof $scope.query;

    if($scope.checkType == "object"){
        $http.get('/search/categories', {params: $scope.query}).then(function(response){
            //console.log(response.data);
            $scope.resultArray = response.data;
            $scope.numberOfResults = $scope.resultArray.length;
        });
    } else {
        $http.get('/search/keyword', {params:{keyword: $scope.query}}).then(function(response) {
            //console.log(response.data);
            $scope.resultArray = response.data;
            $scope.numberOfResults = $scope.resultArray.length;
        });
    }

    // Modal
    $scope.toggleModal = function(result) {
        $scope.modalShown = !$scope.modalShown;
        $scope.currentIndex = $scope.resultArray.indexOf(result);

        // Check if recipe is already in Meal Plan.  If it is, disable "Add to Meal Plan" button
        $http.get('/user/mealPlan').then(function(response){
            $scope.savedRecipes = response.data.mealSaved;

            for (var i = 0; i < $scope.savedRecipes.length; i++) {
                if ($scope.savedRecipes[i]._id == result._id) {
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



}]);