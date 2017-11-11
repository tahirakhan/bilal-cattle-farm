'use strict';

/**
 * @ngdoc service
 * @name app.alert
 * @description
 * # alert
 * Service in the app.
 */
angular.module('app')
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
        },timeout || 500);
    }
  });
