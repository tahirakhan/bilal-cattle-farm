'use strict';

/**
 * @ngdoc function
 * @name app.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('RegisterCtrl', function ($scope,auth,alert) {
    $scope.signup = function(){
        
        auth.register($scope.companyName,$scope.name,$scope.email, $scope.password)
       .then(
           function(res){
             alert('success','Account Created!','Welcome, '+res.data.user.email+ '!');
           }, 
           function(err){
             alert('warning','Something went wrong :(', err.message);
           }
        );
        
    
    }
  });
