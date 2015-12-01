myApp.service('DataService', ["$http", function($http){

    //some Var to store the data
    //var data = undefined;

    var main = ['Beef', 'Pork', 'Chicken/Poultry', 'Lamb/Goat', 'Seafood', 'Pasta/Noodle', 'Tofu', 'Vegetables', 'Egg', 'Rice/Congee'];
    var cuisine =['Chinese', 'American', 'Italian', 'Mexican', 'Japanese', 'Korean', 'Indian', 'Southeast Asian (Thai, Vietnamese, Singaporean, Malaysian)'];
    var dishType = ['Bread', 'Dessert', 'Dim Sum', 'Soup', 'Chinese Festival', 'BBQ', 'Herbal Medicine', 'Salad', 'Sauces'];

    //PRIVATE
    //var getMealPlan = function(){
    //    var promise = $http.get('/user/mealPlan').then(function(response){
    //        data = response.data.mealSaved;
    //        console.log("Async Data Response: ", data);
    //    });
    //    return promise;
    //};

    //Public API to interface with the factory
    // - Execute the 'method of actually getting data'
    // - GETTER to return the data that is being stored in the var

    //PUBLIC
    var publicApi = {
        //retrieveData: function(){
        //    return getMealPlan();
        //},
        //mealPlanData: function(){
        //    return data;
        //},
        mainArray: function(){
            return main;
        },
        cuisineArray: function(){
            return cuisine;
        },
        dishTypeArray: function(){
            return dishType;
        }
    };

    return publicApi;
}]);
