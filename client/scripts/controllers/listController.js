myApp.controller('ListController', ['$scope','$http', function($scope,$http){
    console.log("ListController is working!");

    $scope.noSavedRecipesMessage = false;
    $scope.savedList = [];
    // Hide Add to Meal Plan Button
    $scope.checkSaved = true;


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
    };


    $scope.getList();

}]);