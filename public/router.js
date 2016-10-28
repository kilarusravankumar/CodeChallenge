var myApp=angular.module('myApp',['ngRoute']);
myApp.config(['$routeProvider','$httpProvider',($routeProvider,$httpProvider)=>{
    $routeProvider.
    when('/',{
        templateUrl:'views/main.html',
        controller:'mainController'
    })
    

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
