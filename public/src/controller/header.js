'use strict';

angular.module('app')
  .controller('HeaderCtrl', function ($scope,authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
    
  });
