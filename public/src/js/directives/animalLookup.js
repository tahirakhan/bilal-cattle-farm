'use strict';

/**
 * @ngdoc directive
 * @name app.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('app')
  .directive('animalLookup', function() {
  return {
    restrict: 'E',
    templateUrl: './view/cattlefarm/animal-lookup.html',
    controller: ['$scope','$http','API_URL','authToken', function AnimalLookupController($scope,$http,API_URL,authToken ) {

        $http.get(API_URL+'api/company/'+authToken.getUser().companyId+'/animal').then(function(res){
          $scope.animals = res.data.aaData;
      });
      
    }]
  };
});