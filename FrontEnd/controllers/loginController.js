//This is the way you define controllers
//The main_module variable is dedined in mainModule.js file (located in module folder)
//The first argument is the name of controller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view
//the $scope object is the glue between the view an controller. You use this object to transfer
//data between the view and controller
main_module.controller('controllerLogin', function($scope,loginFactory){
    
    //var user = $scope.user;
    //$scope.pass = "passu"
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('login was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        }
        
        loginFactory.startLogin(temp);
    }
    
    $scope.registerClicked = function(){
        
        console.log('register was pressed');
    }
});