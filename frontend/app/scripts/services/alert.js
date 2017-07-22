'use strict';

/**
 * @ngdoc service
 * @name nodeAngularAppApp.alert
 * @description
 * # alert
 * Service in the nodeAngularAppApp.
 */
angular.module('nodeAngularAppApp')
  .service('alert', function ($rootScope,$timeout) {
    var alertTimeout;
    return function (type,title,message,timeout){
        $rootScope.alert = {
            hasBeenShown: true,
            show: true,
            type: type,
            message: message,
            title:title
        };
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(function(){
            $rootScope.show = false;
        },timeout || 2000);
    }
  });
