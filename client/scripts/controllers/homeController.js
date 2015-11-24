myApp.controller('HomeController', ['$scope','$http', function($scope, $http){
    console.log("HomeController is working!");

    $scope.randomResult = {};

    $scope.randomRecipe = function(){
        $http.get('/random/').then(function(response){
            $scope.randomResult = response.data;
        });
    };

    $scope.randomRecipe();

}]);