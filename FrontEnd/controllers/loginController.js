//This is the way you define controllers
//The main_module variable is dedined in mainModule.js file (located in module folder)
//The first argument is the name of controller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view
//the $scope object is the glue between the view an controller. You use this object to transfer
//data between the view and controller
main_module.controller('controllerLogin', function($scope,loginFactory,$location, Flash){
    
    //var user = $scope.user;
    //$scope.pass = "passu"
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('login was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        };
        
        var waitPromise = loginFactory.startLogin(temp);
        //Wait the response from server
        waitPromise.then(function(data){
            
            console.log('Login successful');
            $location.path('/list').replace();
            //code inside this block will be called when success response
            //from server receives
        },function(data){
            console.log('fail');
            console.log(data);
            Flash.create('danger', 'Wrong user name or password given', 'custom-class');  
            
//            var message = '<strong>Warning!</strong> Wrong username or password!';
//            Flash.create('success', message, 'custom-class');
//            $('.error').text('Wrong username or password!');             
        });
    }
    
    $scope.registerClicked = function(){
        
        console.log('register was pressed');

        var temp = {
            username: $scope.user,
            password: $scope.pass
        };
        var response = loginFactory.startRegister(temp);
	
        response.then(success, error)
    }
});

function success(data){
    
    alert('New person registered. You can now login with your credentials');
    
}
    
function error(data){
    
    alert('Registering person failed. Username already in use')
        
}
 /*       response.then(function (data){
            
            console.log("Successful registration");
            $location.path('/list').replace();
            //code inside this block will be called when success response
            //from server receives
        }, function(data){
            console.log('fail');
            console.log(data);
            //alert('Registration failed!!!');
            $('.error').text('Registration failed!'); */
 //        });
 //   }
//});