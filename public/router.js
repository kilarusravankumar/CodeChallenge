var myApp=angular.module('myApp',['ngRoute','toastr']);
myApp.config(['$routeProvider','$httpProvider',($routeProvider,$httpProvider)=>{
    $routeProvider.
    when('/',{
        templateUrl:'views/main.html',
        controller:'mainController'
    })
    

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
myApp.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,    
    closeButton: true,
    newestOnTop: true,
    positionClass: 'toast-top-full-width',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'section',
    timeOut:5000
  });
});