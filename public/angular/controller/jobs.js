'use strict';

/**
 * @ngdoc function
 * @name app.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the app
 */
angular.module('app')
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
