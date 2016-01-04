//Here we create our main module. First argument is the name of the module, the second one 
//the '[] array' contains the dependencies to other angular modules.
var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

//This function will check if user is logged in or not. This function is used
//in the router below in resolve attribute
function loginRequired($q,$resource,$location){
    //Create a promise
    var deferred = $q.defer();
    $resource('/islogged').query().$promise.then(function success(){
        
        //Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred;
        
    },function fail(){
        
        //Mark promise to be failed
        deferred.reject();
        //Go back to root context
        $location.path('/');
        return deferred;
    });
    
    
}
//Create basic configuration for our angular app.
//Configuration includes USUALLY a router for our views.
//The $routeProvider object comes from ngRoute module
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_login.html',
        controller:'controllerLogin'
        
    }).when('/list',{
        
        templateUrl:'partial_dataView.html',
        controller:'friendDataController',
        resolve:{loginRequired:loginRequired}
        
    }).when('/add',{
        
        templateUrl:'partial_addView.html',
        controller:'addController',
        resolve:{loginRequired:loginRequired}
    });
});