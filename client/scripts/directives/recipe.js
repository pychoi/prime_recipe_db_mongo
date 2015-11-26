myApp.directive('recipe',
    function(){
        return {
            restrict: "AE",
            scope: {
                info: "=",
                message:'=',
                check: '=',
                action: '&'
            },
            templateUrl: "./templates/recipe.html"
        }
    }
);