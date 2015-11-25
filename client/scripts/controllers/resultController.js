myApp.controller('ResultController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams){
    console.log("ResultController is working!");

    $scope.resultArray = [];
    $scope.query = $routeParams.query;
    $scope.url = $location.absUrl();

    //console.log($scope.query);
    //console.log(typeof $scope.query);

    $scope.checkType = typeof $scope.query;

    if($scope.checkType == "object"){
        $http.get('/search/categories', {params: $scope.query}).then(function(response){
            console.log(response.data);
            $scope.resultArray = response.data;
            $scope.numberOfResults = $scope.resultArray.length;
        });
    } else {
        $http.get('/search/keyword', {params:{keyword: $scope.query}}).then(function(response) {
            console.log(response.data);
            $scope.resultArray = response.data;
            $scope.numberOfResults = $scope.resultArray.length;
        });

    }

}]);