myApp.directive('recipe',
    function(){
        return {
            restrict: "AE",
            scope: {
                info: "=",
                action: '&'
            },
            templateUrl: "./templates/recipe.html"
        }
    }
);