var myApp=angular.module('myApp');
myApp.controller('mainController',['$scope','$http',($scope,$http)=>{
    $scope.cash=100000;
    $scope.url="";
    $scope.shares={};
    $scope.lookup="";
    $scope.lookup=$scope.lookup.toUpperCase();
    $scope.userShares=[];
    

   $scope.onClick= function (){
       
       $scope.url="http://data.benzinga.com/rest/richquoteDelayed?symbols="+$scope.lookup.toUpperCase()+"&callback=JSON_CALLBACK";
       if($scope.lookup){
            var symbol=$scope.lookup.valueOf();
            $http.jsonp($scope.url).then((response)=>{
                 var myObj=angular.fromJson(response.data);
                var key=Object.keys(myObj)[0];
                $scope.shares=myObj[key];              
                },(error)=>{
                $scope.lookup="Symbol not found";
                });
         }
    }

    $scope.onAsk=function(){
       
        if(hasStock($scope.userShares,$scope.shares)==-1){
             $scope.shares.quantity=$scope.q;
             $scope.shares.pricePaid=$scope.shares.quantity*$scope.shares.askPrice;
       $scope.userShares.push($scope.shares);}
       else{
           var i=hasStock($scope.userShares,$scope.shares);
           
           $scope.userShares[i].quantity+=$scope.q;
            $scope.userShares[i].pricePaid+=$scope.q*$scope.shares.askPrice;
           }
       $scope.cash-=$scope.shares.quantity*$scope.shares.askPrice;
       if($scope.cash<=0){
            $scope.userShares.pop();
             $scope.cash+=$scope.shares.quantity*$scope.shares.askPrice;
             alert("you cannot buy that much, check your cash ");
       }
       
    }

    $scope.onBid=function(){
        
        if(hasStock($scope.userShares,$scope.shares)!=-1){
            
            var i=hasStock($scope.userShares,$scope.shares);
            
            if($scope.userShares[i].quantity>=$scope.q){
           
            $scope.userShares[i].quantity-=$scope.q;
                $scope.userShares[i].pricePaid-=$scope.q*$scope.shares.bidPrice;
                $scope.cash+=$scope.q*$scope.shares.bidPrice;
                if($scope.userShares[i].quantity<=0){
                     $scope.userShares.splice(i,1);
                }
            }else{
                alert("you don't have that Many shares");
            }
        }else{
            alert("You did not buy that Share"); 
        }
    }
   
}]);

var hasStock=function(arr,a){
   
        for(var i=0;i<arr.length;i++){
            
            if(arr[i].symbol.valueOf()==a.symbol.valueOf()){
                return i;
             }
        }
       return -1; 
}