'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope','alert','auth', '$http', '$state', function($scope,alert,auth, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('api/login', {email: $scope.email, password: $scope.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    }

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
  }])
;
