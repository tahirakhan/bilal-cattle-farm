'use strict';

/**
 * @ngdoc function
 * @name nodeAngularAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nodeAngularAppApp
 */
angular.module('nodeAngularAppApp')
  .controller('LoginCtrl', function ($scope,alert,auth) {
    $scope.submit = function(){
        
        auth.login($scope.email, $scope.password)
       .then(
           function(res){
             alert('success','Welcome','Thanks for coming back, '+res.data.user.email+ '!');
             
           }, 
           function(err){
             alert('warning','Something went wrong :(', err.message);
           }
        );
        
    
    }
  });
