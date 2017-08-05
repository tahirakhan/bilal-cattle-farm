'use strict';

app.controller('NavCtrl', function ($scope,authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
    
  });