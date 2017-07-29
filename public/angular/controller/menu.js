'use strict';

angular.module('app')
  .controller('MenuCtrl', function ($scope,authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
    
  });
