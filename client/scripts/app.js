var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider){
    $routeProvider.
        when('/home', {
            templateUrl: './routes/home.html',
            controller: 'HomeController'
        }).
        when('/search', {
            templateUrl: './routes/search.html',
            controller: 'SearchController'
        }).
        when('/enter', {
            templateUrl: './routes/enter.html',
            controller: 'EnterController'
        }).
        when('/meal', {
            templateUrl: './routes/meal.html',
            controller: 'SearchController'
        }).
        when('/list', {
            templateUrl: './routes/list.html',
            controller: 'ListController'
        }).
        when('/recipe', {
            templateUrl: './routes/recipe.html',
            controller: 'RecipeController'
        }).
        otherwise({
            redirectTo: 'home'
        });

    $mdThemingProvider.theme('default')
        .primaryPalette('grey', {
            'hue-1': '50',
            'hue-2': '700',
            'hue-3': '900'
        })
        .accentPalette('teal', {
            'hue-1': '100',
            'hue-2': '300',
            'hue-3': '600'
        });
}]);
