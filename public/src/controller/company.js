'use strict';

/**
 * @ngdoc function
 * @name app.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('CompanyCtrl', function ($scope,API_URL,$http,authToken,alert) {

    console.log(authToken.getUser().companyId);


    $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId).then(function(res){
        $scope.companyName = res.data.companyName;
    });

    $scope.updateCompanyName=function(){
      
      var companyName = $scope.companyName;
      $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId,{companyName:companyName}).then(function(res){
          alert('success','Updated','Company Name Updated');
      });
    }
  });
