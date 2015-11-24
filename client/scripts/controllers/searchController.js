myApp.controller('SearchController', ['$scope', '$http', function($scope, $http){

    $scope.search = {};
    $scope.search.categories = [];
    $scope.search.keyword = "";
    $scope.searchMode = true;
    $scope.resultArray = [];


    $scope.main = ['Beef', 'Pork', 'Chicken/Poultry', 'Lamb/Goat', 'Seafood', 'Pasta/Noodle', 'Tofu', 'Vegetables', 'Egg', 'Rice/Congee'];
    $scope.cuisine =['Chinese', 'American', 'Italian', 'Mexican', 'Japanese', 'Korean', 'Indian', 'Southeast Asian (Thai, Vietnamese, Singaporean, Malaysian)'];
    $scope.type = ['Bread', 'Dessert', 'Dim Sum', 'Soup', 'Chinese Festival', 'BBQ', 'Herbal Medicine', 'Salad', 'Sauces'];

    $scope.toggleChecked = function(category){
        if ($scope.search.categories.indexOf(category) === -1){
            $scope.search.categories.push(category);
        } else {
            $scope.search.categories.splice($scope.search.categories.indexOf(category), 1);
        }
    };

    $scope.searchKeyword = function(keyword){
        //console.log($scope.search.keyword);
        $http.get('/submit/keyword', {params:{keyword: keyword}}).then(function(response){
            console.log(response.data);

            $scope.resultArray = response.data;

            $scope.searchMode = false;
        });
    };

    $scope.searchCategories = function(){
        $http.get('/submit/categories', {params:{categories: $scope.search.categories}}).then(function(response){
            console.log(response.data);

            $scope.resultArray = response.data;

            $scope.searchMode = false;
        });
    }

}]);