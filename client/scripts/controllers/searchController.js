myApp.controller('SearchController', ['$scope', '$http', 'DataService', function($scope, $http, DataService){

    console.log("search controller is here!");

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
        $http.get('/search/keyword', {params:{keyword: keyword}}).then(function(response){
            console.log(response.data);

            $scope.resultArray = response.data;

            $scope.searchMode = false;
        });
    };

    $scope.searchCategories = function(){
        $http.get('/search/categories', {params:{categories: $scope.search.categories}}).then(function(response){
            console.log(response.data);

            $scope.resultArray = response.data;

            $scope.searchMode = false;
        });
    }

}]);