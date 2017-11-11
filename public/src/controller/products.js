'use strict';

/**
 * @ngdoc function
 * @name app.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ProductsCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    
    $scope.addNewProduct = function(){
      var data = {
          companyId:authToken.getUser().companyId,
          productName:$scope.productName,
          productDescription:$scope.productDescription,
          productPrice:$scope.productPrice,
          productPer:$scope.productPer
        };
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/product',data).then(function(res){
            alert('success','Added','New Product Added');
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/product/'+$scope._id).then(function(res){
          res.data.productName = $scope.productName;
          res.data.productDescription = $scope.productDescription;
          res.data.productPrice = $scope.productPrice;
          res.data.productPer = $scope.productPer;
          
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/product/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New Product Added');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/product/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/product/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/product/'+val).then(function(res){
          $scope.productName = res.data.productName;
          $scope.productDescription = res.data.productDescription;
          $scope.productPrice = res.data.productPrice;
          $scope.productPer = res.data.productPer;
          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/product/'+val).then(function(res){
          alert('success','Deleted','Product Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/product',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'productId' },
            { mData: 'productName' },
            { mData: 'productDescription' },
            { mData: 'productPrice' },
            { mData: 'productPer' },
            { mData: 'active' },
            { mData: '_id' },
            { mData: '_id' }
          ],
        aoColumnDefs: [
            {
                aTargets: [0],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<input type="checkbox" ng-model="data.selected" />';
                   return tbAction;
                }  
            },

            {
                aTargets: [6],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    if(!full.active)
                      tbAction += '<a onClick="angular.element(document.getElementById(\'ProductsCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'ProductsCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [7],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'ProductsCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [8],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'ProductsCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);
