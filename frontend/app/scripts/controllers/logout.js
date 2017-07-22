'use strict';

/**
 * @ngdoc function
 * @name nodeAngularAppApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the nodeAngularAppApp
 */
angular.module('nodeAngularAppApp')
  .controller('LogoutCtrl', function (authToken,$state) {
    authToken.removeToken();
    $state.go('main');
  });
