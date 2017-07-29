'use strict';

// signup controller
app.controller('SignupFormController', ['$scope','auth','alert', '$http', '$state', function($scope,auth,alert, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create
      $http.post('api/signup', {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = response;
        }else{
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    }

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
  }])
 ;