myApp.controller('SearchController', ['$scope', '$http', 'DataService', '$location', function($scope, $http, DataService, $location){

    //console.log("search controller is here!");

    $scope.dataService = DataService;

    $scope.search = {};
    $scope.search.categories = [];
    $scope.search.keyword = "";
    $scope.searchMode = true;
    $scope.resultArray = [];

    $scope.main = $scope.dataService.mainArray();
    $scope.cuisine = $scope.dataService.cuisineArray();
    $scope.type = $scope.dataService.dishTypeArray();

    $scope.toggleChecked = function(category){
        if ($scope.search.categories.indexOf(category) === -1){
            $scope.search.categories.push(category);
        } else {
            $scope.search.categories.splice($scope.search.categories.indexOf(category), 1);
        }
    };

    $scope.searchKeyword = function(keyword){
        $location.path('/result').search({query: keyword});
    };

    $scope.searchCategories = function(){
        $location.path('/result').search({query: {categories: $scope.search.categories}});
    };

}]);