'use strict';

/**
 * @ngdoc directive
 * @name app.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('app')
  .directive('farmLookup', function() {
  return {
    restrict: 'E',
    templateUrl: './view/cattlefarm/farm-lookup.html',
    controller: ['$scope','$http','API_URL','authToken', function FarmLookupController($scope,$http,API_URL,authToken ) {

        $http.get(API_URL+'api/company/'+authToken.getUser().companyId+'/farm').then(function(res){
          $scope.farms = res.data.aaData;
      });
      
    }]
  };
});