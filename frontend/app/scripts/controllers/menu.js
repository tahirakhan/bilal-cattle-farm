'use strict';

angular.module('nodeAngularAppApp')
  .controller('MenuCtrl', function ($scope,authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
    
  });
