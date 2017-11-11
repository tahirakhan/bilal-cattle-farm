'use strict';

/**
 * @ngdoc directive
 * @name app.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('app')
  .directive('productLookup', function() {
  return {
    restrict: 'E',
    templateUrl: './view/cattlefarm/product-lookup.html',
    controller: ['$scope','$http','API_URL','authToken', function MyTabsController($scope,$http,API_URL,authToken ) {

        $http.get(API_URL+'api/company/'+authToken.getUser().companyId+'/product').then(function(res){
          $scope.products = res.data.aaData;
      });
      
    }]
  };
});