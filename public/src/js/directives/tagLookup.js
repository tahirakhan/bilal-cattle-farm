'use strict';

/**
 * @ngdoc directive
 * @name app.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('app')
  .directive('tagLookup', function() {
  return {
    restrict: 'E',
    templateUrl: './view/cattlefarm/tag-lookup.html',
    controller: ['$scope','$http','API_URL','authToken', function TagLookupController($scope,$http,API_URL,authToken ) {

        $http.get(API_URL+'api/company/'+authToken.getUser().companyId+'/animal-tag').then(function(res){
          $scope.tags = res.data.aaData;
      });
      
    }]
  };
});