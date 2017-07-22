'use strict';

/**
 * @ngdoc function
 * @name nodeAngularAppApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the nodeAngularAppApp
 */
angular.module('nodeAngularAppApp')
  .controller('RegisterCtrl', function ($scope,auth,alert) {
    $scope.submit = function(){
        
        auth.register($scope.email, $scope.password)
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
