/*main_module.controller('friendDataController', function($scope,friendDataFactory){
    

    console.log('friendDataController loaded');
        
    //Check if factory does not has the data
    if(friendDataFactory.friendsArray.length === 0)
    {
        var response = friendDataFactory.getFriendData();
        
        response.then(function(data){
        
        friendDataFactory.friendsArray = data;
        $scope.friendData = data;
    });
        
   }else{
       
       $scope.friendData = friendDataFactory.friendsArray;
       
   }
});*/

main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    $scope.name = "by psavela";
    $scope.temp =['Heikki Hela','Risto Mattila','Juha Sipilä','Teuvo Hakkarainen'];
    console.log('friendDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowCliked = function(id){
        
        friendDataFactory.selected_id = id;
        $location.path('/edit').replace();
    }
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
    
    $scope.search = function(){
        console.log('search pressed');
        friendDataFactory.search($scope.search_term).then(function(data){
            console.log(data);
            $scope.friendData = data;
            
        });
    }
});