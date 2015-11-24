myApp.controller('HomeController', ['$scope','$http', function($scope, $http){
    console.log("HomeController is working!");

    $scope.randomResult = {};

    $scope.randomRecipe = function(){
        $http.get('/random/').then(function(response){
           console.log(response.data);
            $scope.randomResult = response.data;
        });
    };

    $scope.randomRecipe();

}]);