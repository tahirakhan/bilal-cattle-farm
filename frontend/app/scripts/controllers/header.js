'use strict';

angular.module('nodeAngularAppApp')
  .controller('HeaderCtrl', function ($scope,authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
    
  });
