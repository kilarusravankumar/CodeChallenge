
var myApp=angular.module('myApp');
myApp.controller('mainController',['$scope','$http','toastr',($scope,$http,toastr)=>{
    $scope.cash=100000;
    $scope.url="";
    $scope.shares={};
    $scope.lookup="";
    $scope.lookup=$scope.lookup.toUpperCase();
    $scope.userShares=[];
    

   $scope.onClick= function (){
       
       $scope.url="https://data.benzinga.com/rest/richquoteDelayed?symbols="+$scope.lookup.toUpperCase()+"&callback=JSON_CALLBACK";
       if($scope.lookup){
            var symbol=$scope.lookup.valueOf();
            $http.jsonp($scope.url).then((response)=>{
                 var myObj=angular.fromJson(response.data);
                var key=Object.keys(myObj)[0];
                $scope.shares=myObj[key]; 
                isError($scope.shares);             
                },(error)=>{
                $scope.lookup="Symbol not found";
                
                });
         }
         
         $scope.lookup="";
    }

    $scope.onAsk=function(){
        if($scope.q*$scope.shares.askPrice<$scope.cash){
        var i=0;
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
            console.log($scope.cash);
            
             $scope.cash+=$scope.shares.quantity*$scope.shares.askPrice;
             $scope.userShares[i].quantity-=$scope.q;
              $scope.userShares[i].pricePaid-=$scope.q*$scope.shares.askPrice;
           
             toastr.error("you cannot buy that much, check your cash ");
       }
       if($scope.userShares[i].quantity<=0){
            userShares[i].splice(i,1);
       }
       
    }else{
        toastr.error("you cannot buy that much, check your cash ");
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
                toastr.error("you don't have that Many shares");
                
            }
        }else{
            
            toastr.error('You did not buy that Share','Error');
        }
    }

    var isError=(obj)=>{
     if(obj.error){
         toastr.error('Symbol not found. Please, try another symbol','unknown symbol');
     }
     return false;
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
 