'use strict';

/**
 * @ngdoc function
 * @name app.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LogoutCtrl', function (authToken,$state) {
    authToken.removeToken();
    $state.go('app.dashboard');
  });
