'use strict';

/**
 * @ngdoc directive
 * @name app.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('app')
  .directive('expenseTypeLookup', function() {
  return {
    restrict: 'E',
    templateUrl: './view/cattlefarm/expense-type-lookup.html',
    controller: ['$scope','$http','API_URL','authToken', function ExpenseTypeLookupController($scope,$http,API_URL,authToken ) {

        $http.get(API_URL+'api/company/'+authToken.getUser().companyId+'/expense-type').then(function(res){
          $scope.expenseTypes = res.data.aaData;
      });
      
    }]
  };
});