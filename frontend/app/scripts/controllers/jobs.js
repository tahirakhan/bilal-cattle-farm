'use strict';

/**
 * @ngdoc function
 * @name nodeAngularAppApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the nodeAngularAppApp
 */
angular.module('nodeAngularAppApp')
  .controller('JobsCtrl', function ($scope,$http,API_URL,alert) {
    
    $http.get(API_URL+ 'jobs')
        .then(
           function(jobs){
                $scope.jobs = jobs.data;           
           }, 
           function(err){
             $scope.jobs = [];
               alert('warning',"Unable to get jobs",err.message);
           }
        );
    
  });
